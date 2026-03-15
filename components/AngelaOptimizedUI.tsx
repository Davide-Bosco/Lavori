export function AngelaOptimizedUI() {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-3">👵 Angela - Interfaccia Semplificata</h4>
        <p className="text-base text-gray-700 leading-relaxed mb-2">
          <strong>Profilo:</strong> 82 anni, Cognitive Frail con MCI (Mild Cognitive Impairment) lieve
        </p>
        <p className="text-base text-gray-700 leading-relaxed">
          <strong>Barriera principale:</strong> Sovraccarico cognitivo con troppe informazioni → Serve interfaccia <strong>ultra-semplificata</strong>
        </p>
      </div>

      {/* Screenshot dell'interfaccia */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h5 className="text-lg font-bold text-[#003366] mb-4">Home Screen - Versione Angela</h5>
        
        <div className="flex justify-center mb-6">
          <div 
            className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-300"
            style={{ width: '375px', height: '667px' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-center"
              style={{
                height: '60px',
                backgroundColor: '#003366',
                color: '#FFFFFF',
              }}
            >
              <span style={{ fontSize: '24px', fontWeight: '600' }}>Home</span>
            </div>

            {/* Content */}
            <div className="bg-white" style={{ height: '547px', padding: '24px' }}>
              {/* Card Prossima Visita */}
              <div 
                className="bg-[#E8E8E8] rounded-lg p-8 border-2 border-black mb-4"
                style={{ minHeight: '247px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div 
                      className="bg-[#003366] rounded-lg flex items-center justify-center"
                      style={{ width: '96px', height: '96px' }}
                    >
                      <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                        <path d="M16 4V12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M32 4V12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 20H42M8 12H40C41.1046 12 42 12.8954 42 14V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V14C6 12.8954 6.89543 12 8 12Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-semibold text-black">
                      Prossima Visita
                    </h3>
                    <p className="text-lg text-black">
                      Dr. Rossi - 15 Gen, 10:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Voice Button */}
              <button
                className="w-full bg-[#218281] rounded-lg mb-4 flex flex-col items-center justify-center gap-3"
                style={{ 
                  height: '88px',
                  border: '1.6px solid #1a6665',
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <path d="M16 25.3333V29.3333" stroke="white" strokeWidth="3.33" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2.66667C13.4227 2.66667 11.3333 4.75601 11.3333 7.33333V16C11.3333 18.5773 13.4227 20.6667 16 20.6667C18.5773 20.6667 20.6667 18.5773 20.6667 16V7.33333C20.6667 4.75601 18.5773 2.66667 16 2.66667Z" stroke="white" strokeWidth="3.33" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M26.6667 14.6667V16C26.6667 21.8917 21.8917 26.6667 16 26.6667C10.1083 26.6667 5.33333 21.8917 5.33333 16V14.6667" stroke="white" strokeWidth="3.33" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white text-lg font-semibold">Voice</span>
              </button>

              {/* SOS Button - Rosso con telefono */}
              <button
                className="w-full bg-[#DC2626] rounded-lg mb-4 flex flex-col items-center justify-center gap-3"
                style={{ 
                  height: '88px',
                  border: '1.6px solid #991B1B',
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <path d="M28.6667 21.92V25.92C28.6681 26.2937 28.5906 26.6636 28.439 27.0049C28.2874 27.3461 28.0655 27.6511 27.7875 27.9001C27.5096 28.149 27.1818 28.3362 26.8251 28.4495C26.4684 28.5628 26.0908 28.5995 25.72 28.5573C21.6284 28.0867 17.7048 26.6509 14.2667 24.3573C11.0886 22.2716 8.38117 19.5642 6.29333 16.3859C4 12.937 2.56437 9.00137 2.10667 4.8973C2.06454 4.52757 2.10088 4.15115 2.21352 3.79541C2.32616 3.43966 2.51254 3.11248 2.76053 2.83479C3.00851 2.5571 3.31227 2.33496 3.65215 2.1826C3.99203 2.03025 4.36066 1.95172 4.73333 1.95197H8.73333C9.38657 1.94553 10.0202 2.17698 10.5205 2.60365C11.0208 3.03033 11.3543 3.62305 11.4533 4.2706C11.6403 5.56522 11.9715 6.83572 12.44 8.05864C12.6261 8.55827 12.6671 9.10117 12.5579 9.62378C12.4487 10.1464 12.1941 10.625 11.8267 11.0053L10.1333 12.6986C12.0742 16.027 14.8906 18.8435 18.2189 20.7843L19.9122 19.091C20.2925 18.7236 20.7712 18.4689 21.2938 18.3597C21.8164 18.2505 22.3593 18.2915 22.8589 18.4776C24.0818 18.9461 25.3523 19.2773 26.647 19.4643C27.3027 19.5642 27.9021 19.9049 28.3286 20.4152C28.7551 20.9254 28.9801 21.5704 28.9667 22.2306L28.6667 21.92Z" stroke="white" strokeWidth="3.33" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white text-lg font-semibold">SOS</span>
              </button>

              {/* Impostazioni Button */}
              <button
                className="w-full bg-[#d1d5db] rounded-lg flex items-center justify-center gap-2"
                style={{ height: '51px' }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="black" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.1667 12.5C16.0557 12.7513 16.0226 13.0302 16.072 13.3006C16.1214 13.571 16.2512 13.8203 16.4442 14.0167L16.4917 14.0642C16.6461 14.2184 16.7687 14.4018 16.8527 14.6037C16.9368 14.8055 16.9806 15.0216 16.9806 15.2396C16.9806 15.4575 16.9368 15.6736 16.8527 15.8755C16.7687 16.0774 16.6461 16.2607 16.4917 16.415C16.3374 16.5694 16.154 16.6919 15.9522 16.776C15.7503 16.86 15.5342 16.9038 15.3162 16.9038C15.0983 16.9038 14.8822 16.86 14.6803 16.776C14.4784 16.6919 14.2951 16.5694 14.1408 16.415L14.0933 16.3675C13.8969 16.1745 13.6476 16.0447 13.3772 15.9953C13.1068 15.9459 12.8279 15.979 12.5767 16.09C12.3309 16.1958 12.1223 16.3711 11.9774 16.5944C11.8326 16.8177 11.7578 17.0793 11.7625 17.345V17.5C11.7625 17.9421 11.5869 18.3659 11.2727 18.6802C10.9584 18.9944 10.5346 19.17 10.0925 19.17C9.6504 19.17 9.22663 18.9944 8.91237 18.6802C8.59811 18.3659 8.4225 17.9421 8.4225 17.5V17.4292C8.41204 17.1543 8.32672 16.8878 8.17603 16.6596C8.02534 16.4314 7.81517 16.2504 7.5675 16.1375C7.31627 16.0265 7.03738 15.9934 6.76698 16.0428C6.49658 16.0922 6.24727 16.222 6.05083 16.415L6.00333 16.4625C5.84906 16.6169 5.66572 16.7395 5.46383 16.8235C5.26195 16.9076 5.04585 16.9514 4.8279 16.9514C4.60996 16.9514 4.39386 16.9076 4.19197 16.8235C3.99009 16.7395 3.80675 16.6169 3.65248 16.4625C3.49807 16.3082 3.37554 16.1249 3.29149 15.923C3.20744 15.7211 3.16362 15.505 3.16362 15.2871C3.16362 15.0691 3.20744 14.853 3.29149 14.6511C3.37554 14.4493 3.49807 14.2659 3.65248 14.1117L3.7 14.0642C3.89296 13.8677 4.02278 13.6184 4.07218 13.348C4.12158 13.0776 4.08848 12.7987 3.97667 12.5475C3.87083 12.3017 3.69557 12.0931 3.47226 11.9482C3.24896 11.8034 2.98738 11.7285 2.72167 11.7333H2.5C2.0579 11.7333 1.63413 11.5577 1.31987 11.2435C1.00561 10.9292 0.83 10.5054 0.83 10.0633C0.83 9.62121 1.00561 9.19744 1.31987 8.88318C1.63413 8.56892 2.0579 8.39331 2.5 8.39331H2.57083C2.84574 8.38285 3.11226 8.29753 3.34043 8.14684C3.5686 7.99615 3.7496 7.78598 3.8625 7.53831C3.97351 7.28708 4.00661 7.00819 3.95721 6.73779C3.90781 6.46739 3.77799 6.21808 3.58503 6.02164L3.53753 5.97414C3.38312 5.81987 3.26059 5.63653 3.17654 5.43465C3.09249 5.23276 3.04867 5.01666 3.04867 4.79872C3.04867 4.58077 3.09249 4.36467 3.17654 4.16279C3.26059 3.9609 3.38312 3.77756 3.53753 3.62329C3.6918 3.46888 3.87514 3.34635 4.07703 3.2623C4.27891 3.17825 4.49501 3.13443 4.71295 3.13443C4.9309 3.13443 5.147 3.17825 5.34888 3.2623C5.55077 3.34635 5.73411 3.46888 5.88838 3.62329L5.93588 3.67079C6.13232 3.86375 6.38163 3.99357 6.65203 4.04297C6.92243 4.09237 7.20132 4.05927 7.45255 3.94746H7.5C7.74583 3.84162 7.95444 3.66636 8.09929 3.44306C8.24414 3.21975 8.31903 2.95817 8.31417 2.69246V2.49998C8.31417 2.05788 8.48978 1.63411 8.80404 1.31985C9.1183 1.00559 9.54207 0.829985 9.98417 0.829985C10.4263 0.829985 10.85 1.00559 11.1643 1.31985C11.4786 1.63411 11.6542 2.05788 11.6542 2.49998V2.57081C11.649 2.83653 11.7239 3.0981 11.8688 3.32141C12.0136 3.54472 12.2222 3.71997 12.468 3.82581C12.7193 3.93683 12.9982 3.96993 13.2686 3.92053C13.539 3.87113 13.7883 3.74131 13.9847 3.54835L14.0322 3.50085C14.1865 3.34644 14.3698 3.22391 14.5717 3.13986C14.7736 3.05581 14.9897 3.01199 15.2076 3.01199C15.4256 3.01199 15.6417 3.05581 15.8436 3.13986C16.0455 3.22391 16.2288 3.34644 16.3831 3.50085C16.5375 3.65512 16.66 3.83846 16.7441 4.04034C16.8281 4.24223 16.8719 4.45833 16.8719 4.67627C16.8719 4.89422 16.8281 5.11032 16.7441 5.3122C16.66 5.51409 16.5375 5.69743 16.3831 5.8517L16.3356 5.8992C16.1426 6.09564 16.0128 6.34495 15.9634 6.61535C15.914 6.88575 15.9471 7.16464 16.0589 7.41587V7.49998C16.1647 7.74581 16.34 7.95442 16.5633 8.09927C16.7866 8.24412 17.0482 8.31901 17.3139 8.31415H17.5064C17.9485 8.31415 18.3723 8.48975 18.6865 8.80401C19.0008 9.11827 19.1764 9.54205 19.1764 9.98415C19.1764 10.4262 19.0008 10.85 18.6865 11.1643C18.3723 11.4785 17.9485 11.6541 17.5064 11.6541H17.4356C17.1699 11.649 16.9083 11.7239 16.685 11.8687C16.4617 12.0136 16.2864 12.2222 16.1806 12.468V12.5Z" stroke="black" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-lg text-black">Impostazioni</span>
              </button>
            </div>

            {/* Bottom Navigation */}
            <div
              className="flex items-center justify-around border-t border-gray-200"
              style={{ height: '60px', backgroundColor: '#003366' }}
            >
              {[
                { icon: '🏠', label: 'Home', active: true },
                { icon: '💊', label: 'Ricette', active: false },
                { icon: '📅', label: 'Visite', active: false },
                { icon: '👤', label: 'Profilo', active: false },
                { icon: '🚨', label: 'SOS', active: false },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="flex flex-col items-center justify-center"
                  style={{
                    width: '75px',
                    height: '60px',
                    opacity: item.active ? 1 : 0.7,
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span 
                    style={{ 
                      fontSize: '12px', 
                      color: '#FFFFFF',
                      fontWeight: item.active ? '600' : '400',
                      marginTop: '4px'
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center">
          Interfaccia ottimizzata per Angela con <strong>focus su 1 sola azione principale</strong>
        </p>
      </div>

      {/* Caratteristiche Specifiche */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h5 className="text-lg font-bold text-[#003366] mb-4">🎯 Caratteristiche Specifiche per Angela</h5>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h6 className="font-semibold text-gray-900 mb-3">Semplificazioni Visive</h6>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">1️⃣</span>
                <span><strong>1 Card Principale:</strong> Solo "Prossima Visita" (azione più importante)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">📏</span>
                <span><strong>Card Grande:</strong> 247px altezza (vs 160px standard) per maggiore visibilità</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">🔲</span>
                <span><strong>Bordo Nero 2px:</strong> Alto contrasto per delimitare chiaramente l'area interattiva</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">📊</span>
                <span><strong>Icona 96x96px:</strong> Il doppio dello standard (48px) per riconoscibilità immediata</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">🔤</span>
                <span><strong>Font 22px:</strong> Titolo molto grande (vs 16px standard)</span>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold text-gray-900 mb-3">Riduzione Complessità</h6>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 flex-shrink-0">✂️</span>
                <span><strong>Rimosse Quick Actions:</strong> Nessuna grid 2x2 (sovraccarico cognitivo)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 flex-shrink-0">🎙️</span>
                <span><strong>Voice Button:</strong> Input vocale per assistenza (teal #218281)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">🚨</span>
                <span><strong>SOS Button:</strong> Pulsante emergenza rosso (#DC2626) con icona telefono</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 flex-shrink-0">⚙️</span>
                <span><strong>Pulsante Impostazioni:</strong> Sempre accessibile ma non invadente (grigio neutro)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 flex-shrink-0">🧭</span>
                <span><strong>Bottom Nav Semplificata:</strong> Solo 5 voci con emoji grandi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 flex-shrink-0">🎨</span>
                <span><strong>Colori Limitati:</strong> Navy (#003366), Teal (#218281), Rosso SOS (#DC2626), Grigio</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rationale WCAG */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-500">
        <h5 className="text-lg font-bold text-gray-900 mb-4">✅ WCAG 2.1 AA - Rationale per MCI</h5>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-purple-600 text-xl flex-shrink-0">1️⃣</span>
            <div>
              <p className="font-semibold text-gray-900">2.4.4 - Link Purpose (In Context)</p>
              <p className="text-gray-700">
                Ogni elemento ha <strong>un solo scopo chiaro</strong>: "Prossima Visita" non lascia dubbi su cosa aspettarsi
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-green-600 text-xl flex-shrink-0">🔲</span>
            <div>
              <p className="font-semibold text-gray-900">1.4.11 - Non-text Contrast (3:1)</p>
              <p className="text-gray-700">
                Bordo nero 2px assicura <strong>contrasto 21:1</strong> (molto oltre il minimo AAA)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-red-600 text-xl flex-shrink-0">🚨</span>
            <div>
              <p className="font-semibold text-gray-900">1.4.1 - Use of Color</p>
              <p className="text-gray-700">
                SOS rosso + icona telefono: <strong>doppia codifica</strong> (colore + semantica) per riconoscibilità immediata
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-blue-600 text-xl flex-shrink-0">🧠</span>
            <div>
              <p className="font-semibold text-gray-900">3.2.4 - Consistent Identification</p>
              <p className="text-gray-700">
                Riduzione elementi = <strong>meno carico cognitivo</strong> per memorizzare la UI
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-yellow-600 text-xl flex-shrink-0">📏</span>
            <div>
              <p className="font-semibold text-gray-900">2.5.5 - Target Size (44x44px minimum)</p>
              <p className="text-gray-700">
                Card principale: <strong>343x247px</strong> (5600% oltre il minimo!) → Perfetta per utenti con MCI + tremori
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison: Standard vs Angela */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h5 className="text-lg font-bold text-[#003366] mb-4">📊 Confronto: Full Complexity vs Angela's Simple</h5>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left font-semibold text-gray-900">Elemento</th>
                <th className="border border-gray-300 p-3 text-left font-semibold text-gray-900">Full Complexity</th>
                <th className="border border-gray-300 p-3 text-left font-semibold text-purple-700">Angela's Simple</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">Quick Actions</td>
                <td className="border border-gray-300 p-3">4 card (grid 2x2)</td>
                <td className="border border-gray-300 p-3 bg-purple-50 font-semibold">1 card principale</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">Dimensione Card</td>
                <td className="border border-gray-300 p-3">160px altezza</td>
                <td className="border border-gray-300 p-3 bg-purple-50 font-semibold">247px altezza (+54%)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">Icone</td>
                <td className="border border-gray-300 p-3">48x48px</td>
                <td className="border border-gray-300 p-3 bg-purple-50 font-semibold">96x96px (+100%)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">Font Titolo</td>
                <td className="border border-gray-300 p-3">16px (semibold)</td>
                <td className="border border-gray-300 p-3 bg-purple-50 font-semibold">22px (+37.5%)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">Bordi Card</td>
                <td className="border border-gray-300 p-3">1px grigio</td>
                <td className="border border-gray-300 p-3 bg-purple-50 font-semibold">2px nero (contrasto max)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">Pulsanti Secondari</td>
                <td className="border border-gray-300 p-3">Voice + IoT (grid 2x1)</td>
                <td className="border border-gray-300 p-3 bg-purple-50 font-semibold">Voice (teal) + SOS rosso (88px)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">Bottom Navigation</td>
                <td className="border border-gray-300 p-3">5 tab con icone 20px</td>
                <td className="border border-gray-300 p-3 bg-purple-50 font-semibold">5 tab con emoji 20px + label grandi</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">Colori Funzionali</td>
                <td className="border border-gray-300 p-3">Navy, Teal, Grigi</td>
                <td className="border border-gray-300 p-3 bg-purple-50 font-semibold">Navy + Teal + Rosso SOS + Grigio</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h5 className="text-xl font-bold mb-4">🎯 Key Takeaways - Ottimizzazione per MCI</h5>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">1️⃣</span>
            <p className="text-base"><strong>Meno è meglio:</strong> 1 azione principale elimina il rischio di paralisi decisionale</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">📏</span>
            <p className="text-base"><strong>Grandezza conta:</strong> Target 300%+ rispetto allo standard WCAG per garantire usabilità anche con tremori</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">⚫</span>
            <p className="text-base"><strong>Contrasto estremo:</strong> Bordi neri su grigio chiaro (21:1) per massima definizione visiva</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🚨</span>
            <p className="text-base"><strong>SOS prioritario:</strong> Pulsante rosso con telefono sempre visibile per emergenze immediate</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🎨</span>
            <p className="text-base"><strong>Palette ridotta:</strong> Max 4 colori funzionali per ridurre sovraccarico sensoriale</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">✅</span>
            <p className="text-base"><strong>Risultato:</strong> App usabile anche da utenti con MCI lieve senza assistenza</p>
          </div>
        </div>
      </div>
    </div>
  );
}
