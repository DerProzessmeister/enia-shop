'use client'
import { useState } from 'react'

export default function ExpertChatButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '320px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          zIndex: 200,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            background: 'var(--primary)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
            }}>👨‍💼</div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>Unser Bodenberater</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', marginRight: '4px' }} />
                Online · Antwortet sofort
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              fontSize: '18px',
              minHeight: 'auto',
              padding: '4px',
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ padding: '20px', background: '#f8f9fa' }}>
            <div style={{
              background: 'white',
              borderRadius: '12px 12px 12px 4px',
              padding: '12px 14px',
              fontSize: '13.5px',
              lineHeight: '1.5',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              color: 'var(--text)',
            }}>
              Hallo! 👋 Ich helfe dir gern beim Finden des richtigen Bodens für dein Zuhause. Was kann ich für dich tun?
            </div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>Berater · gerade eben</div>
          </div>

          {/* Quick actions */}
          <div style={{ padding: '0 16px 12px' }}>
            {['Bodenempfehlung anfragen', 'Gratis Muster bestellen', 'Verlegehilfe bekommen'].map(action => (
              <button key={action} style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 14px',
                marginBottom: '6px',
                border: '1.5px solid var(--border)',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                fontSize: '13px',
                color: 'var(--primary)',
                fontWeight: 600,
                minHeight: '44px',
              }}>
                {action} →
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px 16px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Nachricht schreiben..."
                style={{
                  flex: 1,
                  border: '1.5px solid var(--border)',
                  borderRadius: '8px',
                  padding: '0 12px',
                  fontSize: '13px',
                  outline: 'none',
                  minHeight: '44px',
                  color: 'var(--text)',
                }}
              />
              <button style={{
                background: 'var(--accent)',
                border: 'none',
                borderRadius: '8px',
                width: '44px',
                height: '44px',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '44px',
              }}>→</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'var(--accent)',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 6px 24px rgba(245,200,66,0.5)',
          zIndex: 200,
          minHeight: '52px',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        <span style={{ fontSize: '20px' }}>💬</span>
        <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--primary)', whiteSpace: 'nowrap' }}>
          Frag unseren Berater
        </span>
      </button>
    </>
  )
}
