import { useState } from 'react';

// Full-width tab strip (styled by .contact-tab) that shows one panel at a time.
export default function Tabs({ tabs, renderPanel }) {
  const [activeId, setActiveId] = useState(tabs[0].id);

  return (
    <div className="container-fluid my-5 p-0">
      <div className="contact-contact-tabs" role="tablist">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tab"
            tabIndex={0}
            aria-selected={tab.id === activeId}
            className={`contact-tab${tab.id === activeId ? ' active' : ''}`}
            onClick={() => setActiveId(tab.id)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveId(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} role="tabpanel" className={`contact-form-section${tab.id === activeId ? ' active' : ''}`}>
          {renderPanel(tab)}
        </div>
      ))}
    </div>
  );
}
