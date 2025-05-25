import tkinter as tk
from tkinter import simpledialog, messagebox
import random
import copy


# -------------------
# FUNZIONI DI UTILITÀ
# -------------------

def crea_matrice(N):
    return [['.' for _ in range(N)] for _ in range(N)]


def stampa_matrice(matrice):
    for row in matrice:
        print(" ".join(row))


def punteggio(length):
    if length == 3:
        return 2
    elif length == 4:
        return 10
    elif length == 5:
        return 50
    return 0


def calcola_punteggio(matrice, simbolo):
    punti = 0
    N = len(matrice)
    # 4 matrici booleane per evitare riconteggi nelle diverse direzioni
    visitati_orizzontale = [[False] * N for _ in range(N)]
    visitati_verticale = [[False] * N for _ in range(N)]
    visitati_diag1 = [[False] * N for _ in range(N)]
    visitati_diag2 = [[False] * N for _ in range(N)]

    def conta_sequenze(start_x, start_y, dx, dy, visitati):
        if visitati[start_x][start_y]:
            return 0
        length = 0
        x, y = start_x, start_y
        while 0 <= x < N and 0 <= y < N and matrice[x][y] == simbolo:
            visitati[x][y] = True
            length += 1
            x += dx
            y += dy
        return length

    for i in range(N):
        for j in range(N):
            if matrice[i][j] == simbolo:
                # Orizzontale
                length = conta_sequenze(i, j, 0, 1, visitati_orizzontale)
                if length >= 3:
                    punti += punteggio(length)
               # Verticale
                length = conta_sequenze(i, j, 1, 0, visitati_verticale                        )
                if length >= 3:
                    punti += punteggio(length)
                # Diagonale principale
                length = conta_sequenze(i, j, 1, 1, visitati_diag1)
                if length >= 3:
                    punti += punteggio(length)
                # Diagonale inversa
                length = conta_sequenze(i, j, 1, -1, visitati_diag2)
                if length >= 3:
                    punti += punteggio(length)
    return punti


def simula_mossa(matrice, r, c, simbolo):
    simulazione = copy.deepcopy(matrice)
    simulazione[r][c] = simbolo
    return calcola_punteggio(simulazione, simbolo)


def mossa_computer(matrice, difficolta):
    N = len(matrice)
    simbolo_pc = 'O'
    simbolo_avv = 'X'
    punteggio_attuale = calcola_punteggio(matrice, simbolo_pc)
    libere = [(i, j) for i in range(N) for j in range(N) if matrice[i][j] == '.']

    if not libere:
        return None, None

    # Easy: mossa casuale.
    if difficolta == "Easy":
        return random.choice(libere)

    # Medium: riconosce se esiste una mossa vincente per il pc oppure blocca quella vincente dell’avversario.
    if difficolta == "Medium":
        for r, c in libere:
            if simula_mossa(matrice, r, c, simbolo_pc) >= 50:
                return (r, c)
        for r, c in libere:
            if simula_mossa(matrice, r, c, simbolo_avv) >= 50:
                return (r, c)
        return random.choice(libere)

    # Hard: valuta ogni mossa, cercando di massimizzare il guadagno, e blocca se necessario.
    if difficolta == "Hard":
        for r, c in libere:
            if simula_mossa(matrice, r, c, simbolo_avv) >= 10:
                return (r, c)
        best_move = None
        best_incremento = -float('inf')
        for r, c in libere:
            nuovo_punteggio = simula_mossa(matrice, r, c, simbolo_pc)
            incremento = nuovo_punteggio - punteggio_attuale
            if incremento > best_incremento:
                best_incremento = incremento
                best_move = (r, c)
        return best_move if best_move is not None else random.choice(libere)


# -------------------
# INTERFACCIA GRAFICA
# -------------------

# Dimensione griglia
N = 7
matrice = crea_matrice(N)
punteggi = {1: 0, 2: 0}
turno = 1
bottoni = []  # Lista  bottoni

contro_computer = False  # Modalità: False = giocatore vs giocatore, True = giocatore vs pc
difficolta_pc = "Medium"
nome_giocatore1 = ""
nome_giocatore2 = ""


finestra = tk.Tk()
finestra.title("El juego llamado Filetto")


# Funzione per aggiornare l'etichetta dei turni e dei punteggi
def aggiorna_label():
    turno_text = nome_giocatore1 if turno == 1 else nome_giocatore2
    label_turno.config(text=f"Turno di: {turno_text}")
    label_punti.config(text=f"Punteggi - {nome_giocatore1} (X): {punteggi[1]}    {nome_giocatore2} (O): {punteggi[2]}")


# Funzione per eseguire la mossa del computer
def esegui_mossa_computer():
    global turno
    r, c = mossa_computer(matrice, difficolta_pc)
    if r is None or c is None:
        return
    simbolo = 'O'
    colore = "blue"
    matrice[r][c] = simbolo
    bottoni[r][c].config(text=simbolo, state="disabled", disabledforeground=colore)
    punteggi[2] = calcola_punteggio(matrice, simbolo)
    aggiorna_label()
    if punteggi[2] >= 50:
        messagebox.showinfo("Fine Gioco", f"{nome_giocatore2} ha vinto!")
        finestra.quit()
    else:
        turno = 1
        aggiorna_label()


# Funzione richiamata al click su un bottone della griglia
def clicca(r, c):
    global turno
    if matrice[r][c] != '.':
        return


    if turno == 1:
        simbolo = 'X'
        colore = "red"
    else:
        simbolo = 'O'
        colore = "blue"

    matrice[r][c] = simbolo
    bottoni[r][c].config(text=simbolo, state="disabled", disabledforeground=colore)
    punteggi[turno] = calcola_punteggio(matrice, simbolo)
    aggiorna_label()
    if punteggi[turno] >= 50:
        vincitore = nome_giocatore1 if turno == 1 else nome_giocatore2
        messagebox.showinfo("Fine Gioco", f"{vincitore} ha vinto!")
        finestra.quit()
        return

    turno = 2 if turno == 1 else 1
    aggiorna_label()
    if contro_computer and turno == 2:
        finestra.after(500, esegui_mossa_computer)



# Funzione per il form di scelta della difficoltà
def scegli_difficolta():
    def set_difficolta(livello):
        global difficolta_pc
        difficolta_pc = livello
        top.destroy()

    top = tk.Toplevel()
    top.title("Seleziona Difficoltà")
    top.geometry("300x150")
    label = tk.Label(top, text="Scegli il livello di difficoltà:", font=("Helvetica", 14))
    label.pack(pady=10)
    btn_easy = tk.Button(top, text="Easy", width=15, command=lambda: set_difficolta("Easy"))
    btn_medium = tk.Button(top, text="Medium", width=15, command=lambda: set_difficolta("Medium"))
    btn_hard = tk.Button(top, text="Hard", width=15, command=lambda: set_difficolta("Hard"))
    btn_easy.pack(pady=5)
    btn_medium.pack(pady=5)
    btn_hard.pack(pady=5)
    # Attende la chiusura della finestra prima di proseguire
    top.grab_set()
    top.wait_window(top)


# -------------------
# IMPOSIZIONI INIZIALI
# -------------------

# Nascondi temporaneamente la finestra principale per i dialoghi iniziali
finestra.withdraw()

# Richiesta del nome del primo giocatore (controllo che non sia vuoto)
while True:
    nome_giocatore1 = simpledialog.askstring("Giocatore 1", "Inserisci il nome del primo giocatore (1):")
    if nome_giocatore1 is not None and nome_giocatore1.strip():
        nome_giocatore1 = nome_giocatore1.strip()
        break
    else:
        messagebox.showwarning("Errore", "Il nome del giocatore non può essere vuoto!")

# Scelta della modalità: Vs Computer o Giocatore vs Giocatore
if messagebox.askyesno("Modalità di gioco",
                       "Vuoi giocare contro il Computer?\n(Si = Gioco contro PC, No = 2 Giocatori)"):
    contro_computer = True
    nome_giocatore2 = "Computer"
    scegli_difficolta()
else:
    contro_computer = False
    while True:
        nome_giocatore2 = simpledialog.askstring("Giocatore 2", "Inserisci il nome del secondo giocatore (2):")
        if nome_giocatore2 is not None and nome_giocatore2.strip() and nome_giocatore2.strip() != nome_giocatore1:
            nome_giocatore2 = nome_giocatore2.strip()
            break
        else:
            messagebox.showwarning("Errore",
                                   "Il nome del secondo giocatore non può essere vuoto o uguale a quello del giocatore 1!")

# finestra principale ritornata visibile
finestra.deiconify()

# Configura le etichette per turno e punteggio
label_turno = tk.Label(finestra, text="", font=("Arial", 14))
label_turno.pack(pady=5)
label_punti = tk.Label(finestra, text="", font=("Arial", 12))
label_punti.pack(pady=5)

# Creazione del frame per la griglia dei bottoni
frame_griglia = tk.Frame(finestra)
frame_griglia.pack()

# Inizializzazione della griglia (10x10) con bottoni
for i in range(N):
    riga_bottoni = []
    for j in range(N):
        btn = tk.Button(frame_griglia, text=".", width=3, height=1, font=("Courier", 14),
                        command=lambda r=i, c=j: clicca(r, c))
        btn.grid(row=i, column=j, padx=1, pady=1)
        riga_bottoni.append(btn)
    bottoni.append(riga_bottoni)

aggiorna_label()
finestra.mainloop()

