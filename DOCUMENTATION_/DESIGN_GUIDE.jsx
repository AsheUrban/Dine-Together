import React, { useState } from 'react';

// Dine Together - Design Guide
// Menu Style: Black & White, Typewriter Font, Minimal Borders

const DesignGuide = () => {
  const [activeTab, setActiveTab] = useState('places');

  // ==================== COLOR PALETTE ====================
  const colors = {
    bg: '#FFFFFF',
    text: '#000000',
    muted: 'rgba(0, 0, 0, 0.6)',
    border: '#000000',
    borderLight: '#fafafa',
  };

  // ==================== TYPOGRAPHY ====================
  const fonts = {
    primary: 'Courier, monospace',
  };

  // ==================== SECTION COMPONENT ====================
  const Section = ({ title, children }) => (
    <section style={{
      marginBottom: '48px',
      borderBottom: '1px solid #000',
      paddingBottom: '32px',
    }}>
      <h2 style={{
        fontFamily: fonts.primary,
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '0.1em',
        margin: '0 0 24px',
      }}>{title}</h2>
      {children}
    </section>
  );

  // ==================== AVATAR COMPONENT ====================
  const Avatar = ({ initial, size = 32 }) => (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      border: '1px solid #000',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: fonts.primary,
      fontSize: size === 56 ? '24px' : '14px',
      fontWeight: 700,
    }}>{initial}</div>
  );

  return (
    <div style={{
      fontFamily: fonts.primary,
      background: colors.bg,
      minHeight: '100vh',
      color: colors.text,
      padding: '32px',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>

        {/* ==================== HEADER ==================== */}
        <header style={{
          textAlign: 'center',
          marginBottom: '48px',
          paddingBottom: '24px',
          borderBottom: '2px solid #000',
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            margin: '0 0 8px',
            letterSpacing: '0.15em',
          }}>DINE TOGETHER</h1>
          <p style={{
            fontSize: '12px',
            margin: 0,
            opacity: 0.6,
          }}>Design Guide — Menu Style</p>
        </header>

        {/* ==================== COLOR PALETTE ==================== */}
        <Section title="COLOR PALETTE">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px',
          }}>
            {[
              { name: 'Background', value: '#FFFFFF', desc: 'Page background' },
              { name: 'Text', value: '#000000', desc: 'Primary text' },
              { name: 'Muted', value: 'rgba(0,0,0,0.6)', desc: 'Secondary text' },
              { name: 'Border', value: '#000000', desc: 'Solid borders' },
              { name: 'Border Light', value: '#fafafa', desc: 'Image placeholder' },
            ].map(color => (
              <div key={color.name}>
                <div style={{
                  width: '100%',
                  height: '60px',
                  background: color.value,
                  border: '1px solid #000',
                  marginBottom: '8px',
                }} />
                <div style={{ fontSize: '12px', fontWeight: 700 }}>{color.name}</div>
                <div style={{ fontSize: '10px', opacity: 0.6 }}>{color.value}</div>
                <div style={{ fontSize: '10px', opacity: 0.6 }}>{color.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ==================== TYPOGRAPHY ==================== */}
        <Section title="TYPOGRAPHY">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>FONT FAMILY</div>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>Courier, monospace</div>
            <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>
              Typewriter aesthetic — used for all text
            </div>
          </div>

          <div style={{
            border: '1px solid #000',
            padding: '20px',
            marginBottom: '16px',
          }}>
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              Restaurant Name (18px, bold)
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
              Username (14px, bold)
            </div>
            <div style={{ fontSize: '13px', marginBottom: '8px' }}>
              Body text / Caption (13px, normal)
            </div>
            <div style={{ fontSize: '13px', fontStyle: 'italic', marginBottom: '8px' }}>
              "Quoted caption text" (13px, italic)
            </div>
            <div style={{ fontSize: '12px', marginBottom: '8px' }}>
              Secondary info (12px, normal)
            </div>
            <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>
              Muted text (11px, 60% opacity)
            </div>
            <div style={{ fontSize: '10px', opacity: 0.6 }}>
              Small labels (10px, 60% opacity)
            </div>
          </div>
        </Section>

        {/* ==================== BORDERS & LINES ==================== */}
        <Section title="BORDERS & LINES">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>SOLID BORDER (2px) — Header, post separator</div>
              <div style={{ borderBottom: '2px solid #000', paddingBottom: '8px' }} />
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>SOLID BORDER (1px) — Post cards, image containers</div>
              <div style={{ borderBottom: '1px solid #000', paddingBottom: '8px' }} />
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>DOTTED BORDER (1px) — Menu-style dividers</div>
              <div style={{ borderBottom: '1px dotted #000', paddingBottom: '8px' }} />
            </div>
          </div>
        </Section>

        {/* ==================== AVATAR ==================== */}
        <Section title="AVATAR">
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div>
              <Avatar initial="B" size={32} />
              <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '8px' }}>32px — Post header</div>
            </div>
            <div>
              <Avatar initial="B" size={56} />
              <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '8px' }}>56px — Profile</div>
            </div>
          </div>
          <div style={{
            marginTop: '16px',
            fontSize: '12px',
            opacity: 0.6,
            lineHeight: 1.6,
          }}>
            Simple circle with 1px black border.<br />
            Initial centered, Courier font, bold.
          </div>
        </Section>

        {/* ==================== NAVIGATION ==================== */}
        <Section title="NAVIGATION">
          <div style={{
            border: '1px solid #000',
            borderTop: '2px solid #000',
            padding: '16px',
            marginBottom: '16px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              fontSize: '12px',
            }}>
              <span style={{ fontWeight: 700 }}>[FEED]</span>
              <span style={{ opacity: 0.5 }}>EXPLORE</span>
              <span style={{ opacity: 0.5 }}>PROFILE</span>
            </div>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.6 }}>
            <strong>Location:</strong> Fixed bottom nav (app-style)<br />
            <strong>Active:</strong> [BRACKETS] + bold, 100% opacity<br />
            <strong>Inactive:</strong> No brackets, 50% opacity<br />
            <strong>Gap:</strong> 48px, ALL CAPS, 12px
          </div>
        </Section>

        {/* ==================== POST CARD ==================== */}
        <Section title="POST (PostCard)">
          <article style={{
            paddingBottom: '20px',
            marginBottom: '20px',
            maxWidth: '400px',
          }}>
            {/* PostHeader */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px',
            }}>
              <Avatar initial="B" size={32} />
              <span style={{ fontSize: '14px', fontWeight: 700, flex: 1 }}>Blerp</span>
              <span style={{ fontSize: '11px', opacity: 0.6 }}>2 hours ago</span>
            </div>

            {/* PostCaption */}
            <div style={{
              fontSize: '13px',
              fontStyle: 'italic',
              marginBottom: '14px',
            }}>"Date night spot. Get the tagliatelle."</div>

            {/* PlaceItem (nested) */}
            <div style={{
              border: '1px solid #000',
            }}>
              {/* PlaceImage */}
              <div style={{
                height: '200px',
                background: '#fafafa',
                borderBottom: '1px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                opacity: 0.5,
              }}>PlaceImage</div>

              {/* PlaceInfoSection */}
              <div style={{ padding: '12px', fontSize: '13px', lineHeight: 1.7 }}>
                <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Canard</div>
                <div style={{ opacity: 0.7 }}>734 E Burnside St</div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px dotted #000',
                  padding: '6px 0',
                  marginTop: '8px',
                }}>
                  <span>$$$$</span>
                  <span>★ 4.6</span>
                </div>
              </div>
            </div>
          </article>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>Structure:</strong><br />
            • PostHeader: Avatar (32px) + Username + PostTime<br />
            &nbsp;&nbsp;— PostTime: 11px, 60% opacity, right-aligned<br />
            • PostCaption: Italic, quoted<br />
            • PlaceItem (nested): Image + Info in bordered card<br />
            &nbsp;&nbsp;— PlaceImage: 200px height, border-bottom<br />
            &nbsp;&nbsp;— PlaceName: 18px bold<br />
            &nbsp;&nbsp;— PlaceAddress: 13px, 70% opacity<br />
            &nbsp;&nbsp;— Price/Rating: dotted border-top divider<br />
            • No border between posts (PlaceItem border provides separation)
          </div>
        </Section>

        {/* ==================== PLACE CARD (GRID) ==================== */}
        <Section title="PLACE CARD (PlaceItem in PlaceGrid)">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            maxWidth: '400px',
            marginBottom: '16px',
          }}>
            {['Canard', '¿Por Qué No?'].map(name => (
              <div key={name} style={{
                border: '1px solid #000',
                fontSize: '12px',
              }}>
                {/* PlaceImage */}
                <div style={{
                  height: '100px',
                  background: '#fafafa',
                  borderBottom: '1px solid #000',
                }} />
                <div style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{name}</div>
                  <div style={{ opacity: 0.7, marginBottom: '8px' }}>Burnside</div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px dotted #000',
                    paddingTop: '8px',
                  }}>
                    <span>$$$$</span>
                    <span>★ 4.6</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>PlaceGridStyles:</strong> 2-column grid, 12px gap<br />
            <strong>PlaceItem:</strong> 1px border, no padding on container<br />
            <strong>PlaceImage:</strong> 100px height, border-bottom<br />
            <strong>PlaceInfoSection:</strong> 12px padding<br />
            <strong>PlaceName:</strong> 14px bold<br />
            <strong>PlaceAddress:</strong> 12px, 70% opacity<br />
            <strong>Price/Rating:</strong> Dotted border-top divider
          </div>
        </Section>

        {/* ==================== USER PROFILE ==================== */}
        <Section title="USER PROFILE (InfoSection)">
          <div style={{
            borderBottom: '1px solid #000',
            paddingBottom: '20px',
            marginBottom: '20px',
            maxWidth: '280px',
          }}>
            {/* Avatar + username + kebab */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '16px',
            }}>
              <Avatar initial="B" size={56} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>Blerp</div>
              </div>
              <span style={{ fontSize: '18px', cursor: 'pointer' }}>⋮</span>
            </div>

            {/* BioSection */}
            <div style={{ fontSize: '12px', lineHeight: 1.8 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px dotted #000',
                paddingBottom: '6px',
                marginBottom: '6px',
              }}>
                <span style={{ opacity: 0.6 }}>BEST MEAL</span>
                <span>Tagliatelle</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px dotted #000',
                paddingBottom: '6px',
                marginBottom: '6px',
              }}>
                <span style={{ opacity: 0.6 }}>REPEAT SPOTS</span>
                <span>12</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <span style={{ opacity: 0.6 }}>ABOUT</span>
                <span style={{ textAlign: 'right', maxWidth: '140px' }}>Always looking for the next great meal.</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>InfoSection:</strong> border-bottom 1px solid, padding-bottom 20px<br />
            <strong>ProfileUsername:</strong> 20px bold<br />
            <strong>KebabMenu:</strong> ⋮ icon, right-aligned<br />
            <strong>BioSection:</strong> Menu-style with dotted dividers<br />
            <strong>ProfileBioLabel:</strong> ALL CAPS, 60% opacity
          </div>
        </Section>

        {/* ==================== KEBAB MENU ==================== */}
        <Section title="KEBAB MENU (KebabMenu)">
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'flex-start',
            marginBottom: '16px',
          }}>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>TRIGGER</div>
              <button style={{
                background: 'none',
                border: '1px solid #000',
                fontSize: '18px',
                padding: '8px 12px',
                cursor: 'pointer',
                fontFamily: 'Courier, monospace',
              }}>⋮</button>
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>DROPDOWN</div>
              <div style={{
                border: '1px solid #000',
                minWidth: '120px',
              }}>
                <div style={{
                  padding: '10px 14px',
                  borderBottom: '1px dotted #000',
                  fontSize: '12px',
                }}>EDIT PROFILE</div>
                <div style={{
                  padding: '10px 14px',
                  fontSize: '12px',
                }}>SIGN OUT</div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>KebabMenuButton:</strong> ⋮ character, 18px<br />
            <strong>KebabMenuDropdown:</strong> 1px border, positioned absolute<br />
            <strong>KebabMenuItem:</strong> 12px, ALL CAPS, 10px 14px padding<br />
            <strong>Divider:</strong> 1px dotted between items
          </div>
        </Section>

        {/* ==================== TABS ==================== */}
        <Section title="TABS (TabContainer)">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginBottom: '16px',
            fontSize: '12px',
          }}>
            <button
              onClick={() => setActiveTab('places')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: fonts.primary,
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: activeTab === 'places' ? 700 : 400,
                opacity: activeTab === 'places' ? 1 : 0.5,
              }}
            >
              {activeTab === 'places' ? '[PLACES]' : 'PLACES'}
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: fonts.primary,
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: activeTab === 'posts' ? 700 : 400,
                opacity: activeTab === 'posts' ? 1 : 0.5,
              }}
            >
              {activeTab === 'posts' ? '[POSTS]' : 'POSTS'}
            </button>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>TabButton active:</strong> [BRACKETS], bold, 100% opacity<br />
            <strong>TabButton inactive:</strong> No brackets, normal weight, 50% opacity<br />
            Gap: 32px, centered
          </div>
        </Section>

        {/* ==================== HEADER ==================== */}
        <Section title="HEADER (HeaderContainer)">
          <div style={{
            border: '1px solid #000',
            borderBottom: '2px solid #000',
            padding: '12px 16px',
            marginBottom: '16px',
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: 700,
              textAlign: 'center',
              letterSpacing: '0.1em',
            }}>DINE TOGETHER</div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>HeaderLogo:</strong> 18px, bold, 0.1em letter-spacing, ALL CAPS<br />
            <strong>Border:</strong> 2px solid bottom<br />
            <strong>Note:</strong> Header is branding only — navigation lives in BottomNav
          </div>
        </Section>

        {/* ==================== BOTTOM NAV ==================== */}
        <Section title="BOTTOM NAV">
          <div style={{
            border: '1px solid #000',
            borderTop: '2px solid #000',
            padding: '16px 20px',
            marginBottom: '16px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              fontSize: '12px',
            }}>
              <span style={{ fontWeight: 700 }}>[FEED]</span>
              <span style={{ opacity: 0.5 }}>EXPLORE</span>
              <span style={{ opacity: 0.5 }}>PROFILE</span>
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>Position:</strong> Fixed bottom, full width<br />
            <strong>Border:</strong> 2px solid top<br />
            <strong>Padding:</strong> 16px 20px<br />
            <strong>Gap:</strong> 48px between items<br />
            <strong>Active:</strong> [BRACKETS], bold, 100% opacity<br />
            <strong>Inactive:</strong> No brackets, 50% opacity
          </div>
        </Section>

        {/* ==================== BUTTONS ==================== */}
        <Section title="BUTTONS">
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            marginBottom: '16px',
          }}>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>DEFAULT</div>
              <button style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #000',
                color: '#000',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: 'Courier, monospace',
                cursor: 'pointer',
              }}>SAVE</button>
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>HOVER STATE</div>
              <button style={{
                backgroundColor: '#000',
                border: '1px solid #000',
                color: '#FFF',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: 'Courier, monospace',
                cursor: 'pointer',
              }}>SAVE</button>
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>LINK STYLE</div>
              <button style={{
                background: 'none',
                border: 'none',
                color: '#000',
                fontSize: '12px',
                fontFamily: 'Courier, monospace',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: 0,
              }}>edit profile</button>
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>Button:</strong> 1px border, 12px bold, 8px 16px padding<br />
            <strong>Hover:</strong> Inverts — black bg, white text<br />
            <strong>LinkStyle:</strong> No border/bg, 12px, underline, hover 60% opacity
          </div>
        </Section>

        {/* ==================== CIRCULAR BUTTON ==================== */}
        <Section title="CIRCULAR BUTTON">
          <div style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'flex-start',
            marginBottom: '16px',
          }}>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>DEFAULT</div>
              <button style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFF',
                border: '1px solid #000',
                color: '#000',
                fontSize: '14px',
                fontFamily: 'Courier, monospace',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>←</button>
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>HOVER</div>
              <button style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#000',
                border: '1px solid #000',
                color: '#FFF',
                fontSize: '14px',
                fontFamily: 'Courier, monospace',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>←</button>
            </div>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.6, marginBottom: '8px' }}>DISABLED</div>
              <button style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFF',
                border: '1px solid #000',
                color: '#000',
                fontSize: '14px',
                fontFamily: 'Courier, monospace',
                opacity: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>+</button>
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>Size:</strong> 32px circle, 1px border<br />
            <strong>Font:</strong> 14px, Courier<br />
            <strong>Hover:</strong> Inverts — black bg, white text<br />
            <strong>Disabled:</strong> 50% opacity, no pointer events
          </div>
        </Section>

        {/* ==================== ACTION BAR ==================== */}
        <Section title="ACTION BAR">
          <div style={{
            position: 'relative',
            height: '120px',
            border: '1px dotted rgba(0,0,0,0.2)',
            marginBottom: '16px',
          }}>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '20px',
              display: 'flex',
              gap: '10px',
            }}>
              <button style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFF',
                border: '1px solid #000',
                fontSize: '14px',
                fontFamily: 'Courier, monospace',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>←</button>
              <button style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFF',
                border: '1px solid #000',
                fontSize: '14px',
                fontFamily: 'Courier, monospace',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>+</button>
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>Position:</strong> Fixed, bottom: 70px, left: 20px<br />
            <strong>Layout:</strong> Flex row, 10px gap<br />
            <strong>Children:</strong> CircularButtons (Back ←, Add +)<br />
            <strong>Z-index:</strong> 100 (above content, below footer)
          </div>
        </Section>

        {/* ==================== CONFIRM DIALOG ==================== */}
        <Section title="CONFIRM DIALOG">
          <div style={{
            position: 'relative',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '40px',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px',
          }}>
            <div style={{
              backgroundColor: '#FFF',
              border: '1px solid #000',
              padding: '24px',
              maxWidth: '300px',
              textAlign: 'center',
              fontFamily: 'Courier, monospace',
            }}>
              <p style={{
                fontSize: '13px',
                margin: '0 0 20px 0',
                lineHeight: 1.6,
              }}>Remove this place from your saved list?</p>
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
              }}>
                <button style={{
                  backgroundColor: '#FFF',
                  border: '1px solid #000',
                  color: '#000',
                  padding: '8px 16px',
                  fontFamily: 'Courier, monospace',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}>CANCEL</button>
                <button style={{
                  backgroundColor: '#000',
                  border: '1px solid #000',
                  color: '#FFF',
                  padding: '8px 16px',
                  fontFamily: 'Courier, monospace',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}>REMOVE</button>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>Overlay:</strong> Fixed, rgba(0,0,0,0.5), z-index 1000<br />
            <strong>Container:</strong> White, 1px border, 24px padding, 300px max<br />
            <strong>Message:</strong> 13px, 1.6 line-height<br />
            <strong>Buttons:</strong> 12px gap, centered<br />
            <strong>Cancel:</strong> Default button style (white bg)<br />
            <strong>Danger:</strong> Inverted (black bg, white text), hover reverses
          </div>
        </Section>

        {/* ==================== FORMS ==================== */}
        <Section title="FORMS">
          <div style={{
            border: '1px solid #000',
            padding: '24px',
            maxWidth: '320px',
            marginBottom: '16px',
            fontFamily: 'Courier, monospace',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 700,
              marginBottom: '16px',
            }}>EDIT PROFILE</div>
            <div style={{
              fontSize: '11px',
              opacity: 0.6,
              textTransform: 'uppercase',
              textAlign: 'left',
              marginBottom: '6px',
            }}>BEST MEAL</div>
            <input
              type="text"
              defaultValue="Tagliatelle"
              style={{
                border: '1px solid #000',
                fontFamily: 'Courier, monospace',
                color: '#000',
                background: '#fafafa',
                padding: '10px',
                fontSize: '13px',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '10px',
              }}
            />
            <div style={{
              fontSize: '11px',
              opacity: 0.6,
              textAlign: 'right',
              marginBottom: '10px',
            }}>11/75</div>
            <div style={{
              fontSize: '11px',
              opacity: 0.6,
              textTransform: 'uppercase',
              textAlign: 'left',
              marginBottom: '6px',
            }}>ABOUT</div>
            <textarea
              defaultValue="Always looking for the next great meal."
              style={{
                border: '1px solid #000',
                fontFamily: 'Courier, monospace',
                color: '#000',
                background: '#fafafa',
                padding: '8px',
                fontSize: '13px',
                width: '100%',
                boxSizing: 'border-box',
                resize: 'vertical',
                height: '60px',
              }}
            />
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginTop: '16px',
            }}>
              <button style={{
                backgroundColor: '#FFF',
                border: '1px solid #000',
                color: '#000',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: 'Courier, monospace',
                cursor: 'pointer',
              }}>CANCEL</button>
              <button style={{
                backgroundColor: '#FFF',
                border: '1px solid #000',
                color: '#000',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: 'Courier, monospace',
                cursor: 'pointer',
              }}>SAVE</button>
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>FormContainer:</strong> 320px max, 1px border, 24px padding, centered<br />
            <strong>Input:</strong> 1px border, #fafafa bg, 13px, 10px padding<br />
            <strong>TextArea:</strong> Same as Input, resize vertical<br />
            <strong>FormLabel:</strong> 11px, uppercase, 60% opacity, left-aligned<br />
            <strong>CharacterCounter:</strong> 11px, 60% opacity, right-aligned<br />
            <strong>FormButtons:</strong> Flex, 10px gap, centered, margin-top 16px<br />
            <strong>FormDivider:</strong> 11px, 60% opacity, centered, 20px margin
          </div>
        </Section>

        {/* ==================== SEARCH RESULTS ==================== */}
        <Section title="SEARCH RESULTS">
          <div style={{
            maxWidth: '400px',
            marginBottom: '16px',
            fontFamily: 'Courier, monospace',
          }}>
            <div style={{
              padding: '10px 0',
              borderBottom: '1px dotted #000',
              cursor: 'pointer',
              fontSize: '13px',
            }}>
              <div style={{ fontWeight: 700 }}>Canard</div>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>734 E Burnside St, Portland, OR</div>
            </div>
            <div style={{
              padding: '10px 0',
              borderBottom: '1px dotted #000',
              cursor: 'pointer',
              fontSize: '13px',
            }}>
              <div style={{ fontWeight: 700 }}>¿Por Qué No?</div>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>3524 N Mississippi Ave, Portland, OR</div>
            </div>
            <div style={{
              padding: '10px 0',
              cursor: 'pointer',
              fontSize: '13px',
            }}>
              <div style={{ fontWeight: 700 }}>Pok Pok</div>
              <div style={{ fontSize: '12px', opacity: 0.6 }}>3226 SE Division St, Portland, OR</div>
            </div>
          </div>

          <div style={{ fontSize: '12px', opacity: 0.6, lineHeight: 1.8 }}>
            <strong>SearchResult:</strong> 10px vertical padding<br />
            <strong>Divider:</strong> 1px dotted border-bottom (none on last item)<br />
            <strong>Hover:</strong> 70% opacity<br />
            <strong>Name:</strong> 13px bold<br />
            <strong>Address:</strong> 12px, 60% opacity
          </div>
        </Section>

        {/* ==================== SPACING ==================== */}
        <Section title="SPACING">
          <div style={{ fontSize: '12px', lineHeight: 2 }}>
            <div><strong>Page padding:</strong> 16px</div>
            <div><strong>Max-width:</strong> 480px (mobile-first)</div>
            <div><strong>Post margin-bottom:</strong> 20px</div>
            <div><strong>Section gaps:</strong> 14px (between elements)</div>
            <div><strong>Grid gap:</strong> 12px</div>
            <div><strong>Nav gap:</strong> 48px</div>
            <div><strong>Avatar gap:</strong> 10px (from username)</div>
          </div>
        </Section>

        {/* ==================== FOOTER ==================== */}
        <footer style={{
          textAlign: 'center',
          fontSize: '10px',
          padding: '20px 0',
          opacity: 0.5,
          borderTop: '1px solid #000',
        }}>
          — END OF GUIDE —
        </footer>

      </div>
    </div>
  );
};

export default DesignGuide;
