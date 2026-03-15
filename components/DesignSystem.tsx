export function DesignSystem() {
  const colors = [
    { name: 'Primary Navy Blue', hex: '#003366', textColor: 'white' },
    { name: 'Bianco', hex: '#FFFFFF', textColor: 'black', border: true },
    { name: 'Nero', hex: '#000000', textColor: 'white' },
    { name: 'Grigio Card', hex: '#E8E8E8', textColor: 'black' },
    { name: 'Teal Secondary', hex: '#218281', textColor: 'white' },
    { name: 'High Contrast Yellow', hex: '#FFFF00', textColor: 'black' },
    { name: 'Dark Mode Background', hex: '#1F2121', textColor: 'white' },
    { name: 'Dark Mode Text', hex: '#F5F5F5', textColor: 'black' },
  ];

  const typography = [
    { name: 'Heading 1', size: '24px', weight: 'Bold (600)', family: 'Open Sans', lineHeight: '1.2' },
    { name: 'Heading 2', size: '20px', weight: 'Semibold (550)', family: 'Open Sans', lineHeight: '1.2' },
    { name: 'Body Large', size: '16px', weight: 'Regular (400)', family: 'Open Sans', lineHeight: '1.5' },
    { name: 'Body', size: '14px', weight: 'Regular (400)', family: 'Open Sans', lineHeight: '1.5' },
    { name: 'Label', size: '12px', weight: 'Medium (500)', family: 'Open Sans', lineHeight: '1.5' },
  ];

  const spacing = [
    { value: '4px', label: '4px' },
    { value: '8px', label: '8px' },
    { value: '12px', label: '12px' },
    { value: '16px', label: '16px' },
    { value: '24px', label: '24px' },
  ];

  return (
    <div className="space-y-8">
      {/* Color Palette */}
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-[#003366] mb-6">Campioni Colore</h3>
        <div className="grid grid-cols-4 gap-4">
          {colors.map((color) => (
            <div key={color.hex} className="space-y-2">
              <div
                className="h-24 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: color.hex,
                  color: color.textColor,
                  border: color.border ? '1px solid #000' : 'none',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{color.hex}</span>
              </div>
              <p className="text-center" style={{ fontSize: '12px', color: '#000' }}>
                {color.name}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p style={{ fontSize: '14px', color: '#000' }}>
            <strong>Contrasto Navy/Bianco:</strong> 15:1 (WCAG AAA ✓)
          </p>
          <p style={{ fontSize: '14px', color: '#000' }}>
            <strong>Minimo richiesto WCAG AA:</strong> 4.5:1
          </p>
        </div>
      </section>

      {/* Typography */}
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-[#003366] mb-6">Gerarchia Tipografia</h3>
        <div className="space-y-6">
          {typography.map((typo) => (
            <div key={typo.name} className="border-b border-gray-200 pb-4">
              <div className="flex items-baseline justify-between mb-2">
                <span style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
                  {typo.name}
                </span>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {typo.size} • {typo.weight} • Line Height {typo.lineHeight}
                </span>
              </div>
              <div
                style={{
                  fontSize: typo.size,
                  fontWeight: typo.weight.includes('Bold') ? '600' : 
                             typo.weight.includes('Semibold') ? '550' : 
                             typo.weight.includes('Medium') ? '500' : '400',
                  lineHeight: typo.lineHeight,
                  fontFamily: '"Open Sans", Inter, system-ui, sans-serif',
                  color: '#000',
                }}
              >
                Il tuo benessere inizia qui
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p style={{ fontSize: '14px', color: '#000' }}>
            <strong>Font Family:</strong> Open Sans (fallback: Inter)
          </p>
          <p style={{ fontSize: '14px', color: '#000' }}>
            <strong>Scalabilità:</strong> 14px → 16px → 18px → 24px per accessibilità
          </p>
        </div>
      </section>

      {/* Spacing Scale */}
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-[#003366] mb-6">Spacing Scale</h3>
        <div className="flex items-end gap-8 h-64">
          {spacing.map((space) => (
            <div key={space.value} className="flex flex-col items-center gap-2">
              <div
                className="bg-[#003366] rounded"
                style={{ width: space.value, height: '200px' }}
              />
              <span style={{ fontSize: '12px', color: '#000', fontWeight: '500' }}>
                {space.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p style={{ fontSize: '14px', color: '#000' }}>
            <strong>Minimo tra elementi interattivi:</strong> 8px (WCAG 2.5.5)
          </p>
          <p style={{ fontSize: '14px', color: '#000' }}>
            <strong>Padding standard:</strong> 16px
          </p>
        </div>
      </section>

      {/* Component Standards */}
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-[#003366] mb-6">Componenti Standard</h3>
        <div className="space-y-6">
          {/* Button Examples */}
          <div>
            <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', marginBottom: '12px' }}>
              Pulsanti (Minimo 48x48px)
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                className="bg-[#003366] text-white rounded-lg hover:bg-[#218281] transition-colors"
                style={{ width: '48px', height: '48px', fontSize: '14px' }}
              >
                48
              </button>
              <button
                className="bg-[#003366] text-white rounded-lg hover:bg-[#218281] transition-colors"
                style={{ width: '72px', height: '72px', fontSize: '14px' }}
              >
                72
              </button>
              <button
                className="bg-[#003366] text-white rounded-lg hover:bg-[#218281] transition-colors"
                style={{ width: '96px', height: '96px', fontSize: '16px' }}
              >
                96
              </button>
            </div>
          </div>

          {/* Card Example */}
          <div>
            <p style={{ fontSize: '12px', color: '#666', fontWeight: '500', marginBottom: '12px' }}>
              Card Standard
            </p>
            <div
              className="bg-[#E8E8E8] rounded-lg p-4 border border-black"
              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              <p style={{ fontSize: '14px', color: '#000' }}>
                Contenuto card con sfondo grigio, bordo nero 1px, e ombra soft
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
