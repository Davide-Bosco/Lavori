import { useEffect, useRef } from 'react';

/**
 * Hook che intercetta il pulsante "indietro" del browser/telefono
 * e mostra una conferma prima di permettere all'utente di uscire dall'app.
 * 
 * Funziona aggiungendo uno stato fittizio alla history quando viene abilitato,
 * e intercettando l'evento popstate per mostrare la conferma.
 * 
 * @param enabled - Se true, abilita l'intercettazione del back button
 * @param onExitConfirm - Callback opzionale per gestire la conferma di uscita
 */
export function useExitConfirmOnBack(
  enabled: boolean = true,
  onExitConfirm?: () => boolean
) {
  const hasAddedState = useRef(false);

  useEffect(() => {
    if (!enabled) {
      hasAddedState.current = false;
      return;
    }

    // Aggiungi uno stato fittizio alla history solo una volta
    if (!hasAddedState.current) {
      const appState = { 
        page: 'app-root',
        timestamp: Date.now() 
      };
      window.history.pushState(appState, '', window.location.href);
      hasAddedState.current = true;
    }

    const handlePopState = (event: PopStateEvent) => {
      // L'utente ha premuto il pulsante indietro del browser/telefono
      
      // Usa la callback personalizzata se fornita, altrimenti usa window.confirm
      const shouldExit = onExitConfirm 
        ? onExitConfirm() 
        : window.confirm('Vuoi davvero uscire dall\'app?');

      if (shouldExit) {
        // L'utente conferma l'uscita
        // Rimuovi il flag per evitare problemi se l'utente torna indietro
        hasAddedState.current = false;
        // Permetti al browser di gestire la navigazione indietro
        // Non fare nulla - il popstate ha già fatto il suo lavoro
      } else {
        // L'utente annulla l'uscita - ripristina lo stato nella history
        const appState = { 
          page: 'app-root',
          timestamp: Date.now() 
        };
        window.history.pushState(appState, '', window.location.href);
      }
    };

    // Aggiungi l'event listener per intercettare il back button
    window.addEventListener('popstate', handlePopState);

    // Cleanup: rimuovi il listener quando il componente si smonta o enabled diventa false
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [enabled, onExitConfirm]);

  return null;
}
