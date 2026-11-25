import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, Sparkles } from 'lucide-react';
import { formatNaira, serviceMenu } from './serviceData.js';

const itemCount = serviceMenu.reduce((total, category) => total + category.groups.reduce((groupTotal, group) => groupTotal + group.items.length, 0), 0);

function treatmentMessage(name, price) {
  return `Hello Nora Home Service Spa, I would like to enquire about ${name} (listed price: ${formatNaira(price)}). Please confirm availability and the final price during booking.`;
}

export default function ServiceMenu() {
  const [activeCategory, setActiveCategory] = useState(serviceMenu[0].id);
  const [query, setQuery] = useState('');
  const visibleCategories = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    if (!search) return serviceMenu.filter(category => category.id === activeCategory);
    return serviceMenu.map(category => {
      const categoryMatch = `${category.title} ${category.description}`.toLocaleLowerCase().includes(search);
      const groups = category.groups.map(group => ({
        ...group,
        items: group.items.filter(([name]) => categoryMatch || `${name} ${group.title}`.toLocaleLowerCase().includes(search))
      })).filter(group => group.items.length > 0);
      return { ...category, groups };
    }).filter(category => category.groups.length > 0);
  }, [activeCategory, query]);

  return <section className="service-menu" aria-labelledby="service-menu-title">
    <div className="menu-intro">
      <div>
        <span className="eyebrow"><span/> THE NORA MENU</span>
        <h2 id="service-menu-title">Find your <em>moment.</em></h2>
        <p>Explore the treatments and packages currently listed by Nora Home Service Spa.</p>
      </div>
      <a className="button button-gold menu-enquire-all" href="https://wa.me/2347068752258?text=Hello%20Nora%20Home%20Service%20Spa%2C%20I%20would%20like%20to%20ask%20about%20your%20treatments%20and%20availability." target="_blank" rel="noreferrer">
        Enquire on WhatsApp <ArrowUpRight size={16}/>
      </a>
    </div>

    <div className="menu-price-overview" aria-label="Price overview">
      <div><span>LOWEST LISTED PRICE</span><strong>₦5,000</strong><small>Belly Button Wax</small></div>
      <div><span>HIGHEST LISTED PRICE</span><strong>₦235,000</strong><small>Káráyá Couples Romantic Eclipse</small></div>
    </div>

    <div className="menu-tools">
      <label className="menu-search">
        <Search size={18} aria-hidden="true"/>
        <span className="visually-hidden">Search treatments</span>
        <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search treatments or packages"/>
        {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
      </label>
      <span className="menu-total"><Sparkles size={15}/> {itemCount} listed options</span>
    </div>

    <div className="menu-categories" role="tablist" aria-label="Treatment categories">
      {serviceMenu.map((category, index) => {
        const count = category.groups.reduce((total, group) => total + group.items.length, 0);
        const selected = activeCategory === category.id && !query;
        return <button type="button" role="tab" aria-selected={selected} className={`menu-category-tab ${selected ? 'selected' : ''}`} key={category.id} onClick={() => { setActiveCategory(category.id); setQuery(''); }}>
          <span className="menu-tab-number">0{index + 1}</span>
          <span className="menu-tab-copy"><strong>{category.title}</strong><small>{count} {count === 1 ? 'option' : 'options'}</small></span>
          <ArrowUpRight size={15}/>
        </button>;
      })}
    </div>

    <div className="menu-results" aria-live="polite">
      {visibleCategories.length === 0 ? <div className="menu-empty"><Search size={21}/><p>No treatments match “{query}”. Try another search.</p></div> : visibleCategories.map(category => {
        const count = category.groups.reduce((total, group) => total + group.items.length, 0);
        return <section className="menu-category-content" key={category.id} aria-label={category.title}>
          <div className="menu-category-heading">
            <span className="menu-category-number">{String(serviceMenu.findIndex(item => item.id === category.id) + 1).padStart(2, '0')}</span>
            <div><span className="eyebrow"><span/> {category.description}</span><h3>{category.title}</h3></div>
            <span className="menu-result-count">{count} {count === 1 ? 'treatment' : 'treatments'}</span>
          </div>
          <div className="menu-group-grid">
            {category.groups.map(group => <section className="menu-group" key={group.title}>
              <div className="menu-group-heading"><h4>{group.title}</h4>{group.note && <span>{group.note}</span>}</div>
              <div className="menu-item-list">
                {group.items.map(([name, price]) => <a className="menu-item" key={name} href={`https://wa.me/2347068752258?text=${encodeURIComponent(treatmentMessage(name, price))}`} target="_blank" rel="noreferrer" aria-label={`Enquire about ${name}, listed price ${formatNaira(price)}`}>
                  <span className="menu-item-name">{name}</span><span className="menu-item-price">{formatNaira(price)}</span><ArrowUpRight className="menu-item-arrow" size={15}/>
                </a>)}
              </div>
            </section>)}
          </div>
        </section>;
      })}
    </div>

    <p className="menu-price-note"><span>PRICE NOTE</span>Prices shown are as supplied by Nora Home Service Spa. Treatment availability and final prices are confirmed during booking.</p>
  </section>;
}
