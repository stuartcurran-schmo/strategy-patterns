import { useState, useMemo } from 'react';

// Inline SVG Icon Component (replaces lucide-react)
const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    Search: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    Filter: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    ArrowRight: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
    Zap: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    Target: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    TrendingUp: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    Shield: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    Users: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    Brain: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
    BookOpen: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    X: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    Download: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
    GitBranch: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
    Plus: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
    Minus: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M5 12h14"/></svg>,
    FileText: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>,
    Database: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  };
  return icons[name] || null;
};

// Strategy patterns data
const patterns = [
  { id: 1, name: "Alliance", description: "Create coupling between organisations, so that all can gain more market share than alone.", landscape: "Collaborative", subCategory: "Collaboration of power", rank: 5, fit: true, time: true, power: false, challenge: "Medium", accessTo: "Cartel", accessFrom: "Herd member that wants to be on leading edge", whoExecutes: "Herd member that wants to be on leading edge", whenExecute: "Market with scope for growth with large, diverse herd", whatWin: "Access to differntiating capabilities, potential for new products and services, new market access", example: "GlaxoSmithKline", relatedPatterns: [] },
  { id: 2, name: "Augmentation", description: "Refresh coupling to market by adding new features to hold market share.", landscape: "Market-changing", subCategory: "Change market timing", rank: 2, fit: true, time: false, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 3, name: "Authority", description: "Influence trajectory of sector through coupling based on deep expertise.", landscape: "Herd management", subCategory: "", rank: 0, fit: true, time: true, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 4, name: "Autolycus", description: "Exploit coupling of larger player to their market by filling gaps in their value proposition.", landscape: "Small organisation", subCategory: "", rank: 3, fit: true, time: false, power: false, challenge: "Medium", accessTo: "Independent", accessFrom: "Piggyback", whoExecutes: "A small player with a keen eye for opportunity and agility to pounce", whenExecute: "When large player has built incomplete market opportunity with value niches", whatWin: "Market niche that can grow on back of bigger player", example: "Accessories market for Model T Ford", relatedPatterns: ["Independent", "Piggyback"] },
  { id: 5, name: "Bowling Alley", description: "Create couplings with actors with different problems in different sectors to demonstrate your value.", landscape: "Growth", subCategory: "", rank: 2, fit: true, time: true, power: true, challenge: "High", accessTo: "Tornado", accessFrom: "", whoExecutes: "Edge organisation in new/evolving market that can operate effectively with other edge organisations or individuals", whenExecute: "At the point where an innovation moves from a concept to a saleable (and scalable) product", whatWin: "Entry to high-growth, high-margin market or segment", example: "Adoption of Lean", relatedPatterns: ["Tornado"] },
  { id: 6, name: "Brand Reputation", description: "Strengthen coupling through brand reputation aligned to customers' values to maintain share.", landscape: "Defensive", subCategory: "Defend by slowing time down", rank: 2, fit: true, time: true, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "Louis Vuitton", relatedPatterns: [] },
  { id: 7, name: "Broadcast", description: "Test many products in the marketplace to find the big hitters where you can build a strong coupling.", landscape: "Growth", subCategory: "Grow the market", rank: 6, fit: true, time: false, power: false, challenge: "Low", accessTo: "Settlers", accessFrom: "Organic Growth", whoExecutes: "Organisations in markets with high uncertainty and failure rates", whenExecute: "Ongoing", whatWin: "Access to multiple niches, increased probability of profitable niche", example: "Book publishing", relatedPatterns: ["Settlers", "Organic Growth"] },
  { id: 8, name: "Bubble", description: "Create intense energy in coupling from product to market, drive rapid price escalation, then exit.", landscape: "Market-changing", subCategory: "Change market timing", rank: 10, fit: true, time: true, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 9, name: "Camouflage", description: "Reduce your apparent strength in your coupling to the market in order to avoid competitor attention.", landscape: "Cunning plans", subCategory: "", rank: 0, fit: true, time: true, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 10, name: "Cartel", description: "Build couplings with others in order to create a powerful combined market coupling.", landscape: "Collaborative", subCategory: "Collaboration of power", rank: 3, fit: true, time: true, power: false, challenge: "High", accessTo: "Alliance", accessFrom: "", whoExecutes: "Large organisations with non-differntiated products", whenExecute: "Ongoing", whatWin: "Stability of proce and market share", example: "OPEC", relatedPatterns: ["Alliance"] },
  { id: 11, name: "Change the Game", description: "Change the market by at least a disruptive change in the coupling.", landscape: "Defensive", subCategory: "Defend by building strength", rank: 3, fit: true, time: true, power: false, challenge: "High", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "Xerox", relatedPatterns: [] },
  { id: 12, name: "Cluster", description: "Build couplings to nearby and complementary organisations to drive innovation.", landscape: "Collaborative", subCategory: "Collaboration of specialism", rank: 6, fit: true, time: false, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "Innovative org that wants to be on leading edge", whenExecute: "In new or rapidly growing market", whatWin: "Access to other innovative yet differentiated orgs, increased range of product and services", example: "City of Cambridge", relatedPatterns: [] },
  { id: 13, name: "Core", description: "Focus on the essential value proposition in coupling to market to maintain position.", landscape: "Defensive", subCategory: "Defend by reducing strength", rank: 9, fit: true, time: false, power: false, challenge: "Low", accessTo: "Gorilla", accessFrom: "Core", whoExecutes: "", whenExecute: "", whatWin: "", example: "Honda", relatedPatterns: ["Gorilla"] },
  { id: 14, name: "Crusader", description: "Supplant the coupling between herd and market with a new value type for higher purpose.", landscape: "Market-changing", subCategory: "Change value offer", rank: 5, fit: true, time: true, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 15, name: "Disintermediation", description: "Create coupling direct to market by removing intermediary and reducing costs.", landscape: "Market-changing", subCategory: "Change market structure", rank: 8, fit: true, time: true, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 16, name: "Divestment", description: "Eliminate part of the coupling to the market to reduce costs.", landscape: "Defensive", subCategory: "Defend by reducing strength", rank: 11, fit: true, time: true, power: false, challenge: "Low", accessTo: "Core", accessFrom: "Downsizing", whoExecutes: "", whenExecute: "", whatWin: "", example: "Quorn", relatedPatterns: ["Core", "Downsizing"] },
  { id: 17, name: "Diversification", description: "Create new couplings in new markets or with new products to smooth revenues and reduce risk.", landscape: "Growth", subCategory: "Grow your capabilities", rank: 5, fit: true, time: false, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "Strong, cash-rich player that can acquire and manage diffuse businesses", whenExecute: "When existing business is mature or market in decline", whatWin: "Access to new markets, sources of growth, spread bet on risk", example: "ICI, General Electric, Unilever", relatedPatterns: [] },
  { id: 18, name: "Downsizing", description: "Reduce strength in coupling to reduce costs.", landscape: "Defensive", subCategory: "Defend by reducing strength", rank: 12, fit: true, time: true, power: false, challenge: "Low", accessTo: "Divestment", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "Boeing", relatedPatterns: ["Divestment"] },
  { id: 19, name: "Dragonfly", description: "Maintain coupling to market through heritage or traditional offering.", landscape: "Defensive", subCategory: "Defend by slowing time down", rank: 13, fit: true, time: true, power: false, challenge: "Low", accessTo: "Lock In", accessFrom: "Long Tail", whoExecutes: "Laggard on herd edge or an individual small player", whenExecute: "When herd moves in direction you don't want to folow", whatWin: "Defensible niche market", example: "Morgan Motor Company", relatedPatterns: ["Lock In", "Long Tail"] },
  { id: 20, name: "Easy Entry", description: "Attract customers to a service by a short-term commitment to a coupling.", landscape: "Defensive", subCategory: "Defend by building strength", rank: 14, fit: true, time: true, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "Pay-as-you-go phones", relatedPatterns: [] },
  { id: 21, name: "Expert", description: "Build dominance and evolve coupling to market through sustained innovation.", landscape: "Supplier", subCategory: "Technical competence", rank: 3, fit: true, time: true, power: true, challenge: "High", accessTo: "Troubleshooter", accessFrom: "Troubleshooter", whoExecutes: "Player with deep technical capabilities and expertise in a sector", whenExecute: "In a high-tech environment where there are rewards for sustained investment over a long period", whatWin: "Market share and premium margin based on technical quality of offerings", example: "Enercon", relatedPatterns: ["Troubleshooter"] },
  { id: 22, name: "Falcon", description: "Used stored energy to attack and exploit the other's coupling to the market to capture market share.", landscape: "Competitive", subCategory: "Reactive", rank: 2, fit: true, time: true, power: false, challenge: "High", accessTo: "", accessFrom: "", whoExecutes: "Any player with a surplus of power", whenExecute: "When target is concentrating on developing the market", whatWin: "Developing markets quickly or pretection against threat", example: "Internet Explorer v Netscape", relatedPatterns: [] },
  { id: 23, name: "Fast Follower", description: "Rapidly build coupling in market to exploit efforts of the first to market.", landscape: "Competitive", subCategory: "Reactive", rank: 4, fit: true, time: true, power: false, challenge: "Low", accessTo: "Frontal Attack", accessFrom: "", whoExecutes: "Large org muscling in on market or small org competing with larger", whenExecute: "After First Mover during rapid growth in market size", whatWin: "Market share at lower risk or market leadership", example: "Boeing after de Havilland", relatedPatterns: ["Frontal Attack"] },
  { id: 24, name: "Feint", description: "Only pretend to change coupling in order to avoid difficult challenges.", landscape: "Cunning plans", subCategory: "", rank: 0, fit: true, time: false, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 25, name: "First Mover", description: "Be first to create coupling in market to capture market share.", landscape: "Small organisation", subCategory: "", rank: 1, fit: true, time: true, power: false, challenge: "Low", accessTo: "Independent", accessFrom: "", whoExecutes: "Small firms wishing to compete with larger rivals", whenExecute: "To gain advantage in stable market with comfortable routine", whatWin: "Market position, reputational prestige", example: "Tea Clippers", relatedPatterns: ["Independent"] },
  { id: 26, name: "Frigate Bird", description: "Increase your apparent strength to create new coupling opportunities.", landscape: "Small organisation", subCategory: "", rank: 5, fit: true, time: true, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "Small players with weak track record or lack of resources", whenExecute: "When trying to engage a much bigger customer", whatWin: "An engagement that would otherwise be unachievable", example: "", relatedPatterns: [] },
  { id: 27, name: "Frontal Attack", description: "Directly attack competitor through coupling to shared market for advantage.", landscape: "Competitive", subCategory: "Reactive", rank: 6, fit: true, time: true, power: false, challenge: "Low", accessTo: "Fast Follower", accessFrom: "", whoExecutes: "Powerful orgs with enough resource", whenExecute: "On structural coupling between competitors", whatWin: "Overall leadership", example: "Warner Bros Harry Potter and Batman franchises v Lord of the Rings, Avatar", relatedPatterns: ["Fast Follower"] },
  { id: 28, name: "Go-Between", description: "Enable coupling between others to create market.", landscape: "Collaborative", subCategory: "Collaboration of specialism", rank: 4, fit: true, time: true, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "Small player or player with resources to scale quickly", whenExecute: "Whenever opportunities to create new value through networking", whatWin: "Strong market position, monopoly within a sector", example: "eBay", relatedPatterns: [] },
  { id: 29, name: "Gorilla", description: "Overwhelm others by the massive dominance of your coupling.", landscape: "Defensive", subCategory: "Defend by reducing strength", rank: 1, fit: true, time: true, power: false, challenge: "Low", accessTo: "Core", accessFrom: "", whoExecutes: "Strongest player in market by substantial margin", whenExecute: "During Tornado phase of new market", whatWin: "Dominance, shaping the market, sales volumes and high margins", example: "Luxottica", relatedPatterns: ["Core"] },
  { id: 30, name: "Guerilla", description: "Destabilise competitor by constantly reconfiguring coupling.", landscape: "Cunning plans", subCategory: "", rank: 0, fit: true, time: true, power: true, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 31, name: "Harlequin", description: "Break or transform couplings to reinvent yourself and reach yourself and reach different markets.", landscape: "Cunning plans", subCategory: "", rank: 0, fit: true, time: false, power: false, challenge: "High", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 32, name: "Horizontal Integration", description: "Integrate units coupled at single points of the value chain to reduce costs.", landscape: "Defensive", subCategory: "Defend by building strength", rank: 5, fit: true, time: false, power: false, challenge: "Medium", accessTo: "M&A for Economies of Scale", accessFrom: "Keeping up with the Joneses", whoExecutes: "", whenExecute: "", whatWin: "", example: "Virgin Active", relatedPatterns: ["M&A for Economies of Scale", "Keeping up with the Joneses"] },
  { id: 33, name: "Independent", description: "Create highly differentiated coupling to the market.", landscape: "Small organisation", subCategory: "", rank: 2, fit: true, time: false, power: false, challenge: "Low", accessTo: "First Mover", accessFrom: "Autolycus", whoExecutes: "Players comfortable with being different and can navigate own course", whenExecute: "When there is opportunity to establish advantageous, clearly differentiatiated position", whatWin: "Reputation, premium postion, stable/loyal market", example: "Aardman Animations", relatedPatterns: ["First Mover", "Autolycus"] },
  { id: 34, name: "Intermediation", description: "Create intermediary coupling between supplier and market in order to add value to customers.", landscape: "Market-changing", subCategory: "Change market structure", rank: 9, fit: true, time: true, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 35, name: "Islands of Sanity", description: "In chaotic times, befirst to define and create stability and key couplings.", landscape: "Herd management", subCategory: "", rank: 0, fit: true, time: true, power: true, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 36, name: "Jeeves", description: "As supplier, covertly and benignly influence the coupling in your area of expertise.", landscape: "Supplier", subCategory: "Customer intimacy", rank: 4, fit: true, time: true, power: false, challenge: "High", accessTo: "Strategic Partner", accessFrom: "Remora", whoExecutes: "Those in long term relationship with large client where cannot overtly adopt Stategic Partner strategy", whenExecute: "When you can see risks/opportunities that client cannot or refuses to see", whatWin: "Covert trusted advisor status, growth potential with added value", example: "", relatedPatterns: ["Strategic Partner", "Remora"] },
  { id: 37, name: "Jigsaw", description: "Create highly leveraged value to a coupling through specialist expertise.", landscape: "Collaborative", subCategory: "Collaboration of specialism", rank: 2, fit: true, time: true, power: true, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "Weaker edge or individual org with critical mass in valuable yet narrow expertise", whenExecute: "Opportunistically", whatWin: "A share in growth from combined capabilities", example: "Dunhumby and Tesco", relatedPatterns: [] },
  { id: 38, name: "Keeping up with the Joneses", description: "Match your product range to that of the herd or competitor you are coupled to.", landscape: "Defensive", subCategory: "Defend by building strength", rank: 7, fit: true, time: false, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "Automotive sector", relatedPatterns: [] },
  { id: 39, name: "Keiretsu", description: "Create formally inter-coupled set of companies for power and defence.", landscape: "Collaborative", subCategory: "", rank: 1, fit: true, time: false, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "Companies with interlocking shareholding structure", whenExecute: "Existing market under threat", whatWin: "Time to prepare new strategy", example: "Fujifilm", relatedPatterns: [] },
  { id: 40, name: "Knight's Move", description: "Concentrate power on coupling with segment, then adjoining segments to take market.", landscape: "Competitive", subCategory: "Proactive", rank: 3, fit: true, time: true, power: true, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "New entrants to market", whenExecute: "To take market from well-entrenched competitor who holds a strong market position.", whatWin: "Market domination", example: "Japanese v British motorcycles", relatedPatterns: [] },
  { id: 41, name: "Leader", description: "Set herd trajectory through changes in your coupling to the market.", landscape: "Herd management", subCategory: "", rank: 0, fit: true, time: true, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 42, name: "Linus", description: "Strengthen couplings within the herd to maintain its cohesion.", landscape: "Herd management", subCategory: "", rank: 0, fit: true, time: false, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 43, name: "Lock In", description: "Hold customers in coupling by making it hard or unappealing to switch.", landscape: "Defensive", subCategory: "Defend by slowing time down", rank: 15, fit: true, time: true, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "Large herd player in mature competitve environment", whenExecute: "If threatened by competition or market instability", whatWin: "Stabilisation of market, retention of customers, market share", example: "SAP, Oracle", relatedPatterns: [] },
  { id: 44, name: "Loki", description: "Destabilise others' couplings and exploit the chaos that follows.", landscape: "Cunning plans", subCategory: "", rank: 0, fit: true, time: true, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 45, name: "Long Tail", description: "Maintain and milk coupling in a declining market.", landscape: "Defensive", subCategory: "Defend by slowing time down", rank: 10, fit: true, time: true, power: false, challenge: "Low", accessTo: "Dragonfly", accessFrom: "", whoExecutes: "Organisations running a mixed portfolio of offerings", whenExecute: "When market is in terminal decline", whatWin: "Maximise revenue with minimum investment", example: "Clipper ships post Suez Canal", relatedPatterns: ["Dragonfly"] },
  { id: 46, name: "Marketect", description: "Restructure market through your products and couplings to your advantage.", landscape: "Market-changing", subCategory: "Change market structure", rank: 1, fit: true, time: true, power: true, challenge: "High", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 47, name: "Market Maker", description: "Create a new market and couple to it.", landscape: "Market-changing", subCategory: "Change value offer", rank: 3, fit: true, time: true, power: true, challenge: "High", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 48, name: "Masquerade", description: "Create two couplings to present two brands for the same offering to the market.", landscape: "Cunning plans", subCategory: "", rank: 0, fit: true, time: true, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 49, name: "M&A for Economies of Scale", description: "Merge organisations to reduce the cost of servicing the coupling.", landscape: "Defensive", subCategory: "Defend by reducing strength", rank: 4, fit: true, time: false, power: false, challenge: "High", accessTo: "Gorilla", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "Orange and T-Mobile become EE", relatedPatterns: ["Gorilla"] },
  { id: 50, name: "M&A for Synergy", description: "Merge organisations to create new couplings or value propositions.", landscape: "Growth", subCategory: "Grow your capabilities", rank: 3, fit: true, time: true, power: false, challenge: "High", accessTo: "", accessFrom: "", whoExecutes: "Large organisation taking over a smaller one", whenExecute: "When need to swap power for time and move quickly to buy advantage in new area", whatWin: "Synergy, new value proposition for positioning advantage", example: "BT", relatedPatterns: [] },
  { id: 51, name: "Mouse", description: "Stay small to keep market coupling below competitor's radar.", landscape: "Small organisation", subCategory: "", rank: 4, fit: true, time: true, power: false, challenge: "Low", accessTo: "Independent", accessFrom: "", whoExecutes: "Small organisations in environment dominated by larger players", whenExecute: "When larger players might see you as a threat and no chance of other defense", whatWin: "Relative security and freedom to operate", example: "", relatedPatterns: ["Independent"] },
  { id: 52, name: "Musk Ox", description: "Herd coalesce to mitigate attack on coupling to market.", landscape: "Defensive", subCategory: "Defend by slowing time down", rank: 6, fit: true, time: true, power: true, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "Any organisation of any size in sector with at least 3 players", whenExecute: "Whenever there are similar players in stable environments", whatWin: "Defense, easier access to partners, saving energy", example: "", relatedPatterns: [] },
  { id: 53, name: "Niche", description: "Concentrate on coupling to targeted slice of the market for localised advantage.", landscape: "Market-changing", subCategory: "Change market structure", rank: 4, fit: true, time: true, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 54, name: "Organic Growth", description: "Gradually build couplings to adjacent markets through reinvestment of profit for growth.", landscape: "Growth", subCategory: "Grow the market", rank: 8, fit: true, time: false, power: false, challenge: "Low", accessTo: "Broadcast", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "SAB Miller", relatedPatterns: ["Broadcast"] },
  { id: 55, name: "Outsource", description: "Build a coupling to a third party delivering capabilities that allow them to focus on their strengths.", landscape: "Supplier", subCategory: "Technical competence", rank: 6, fit: true, time: true, power: true, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "Org with bounded set of non-differentiating capabilities it can deliver more cheaply via 3rd party", whenExecute: "When outsourced operations are stable and mature", whatWin: "Reduced cost of operations", example: "", relatedPatterns: [] },
  { id: 56, name: "Paradigm Attack", description: "Fracture others' couplings and seize their ground with innovative value proposition.", landscape: "Competitive", subCategory: "Proactive or reactive", rank: 1, fit: true, time: false, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "Org with paradigm-shifting innovation", whenExecute: "Disclocate working of existing market or create new market", whatWin: "Competitive advantage or only player in new market", example: "Medtronics battery-powered pacemaker", relatedPatterns: [] },
  { id: 57, name: "Parasite", description: "Abuse coupling with customer for your goals.", landscape: "Supplier", subCategory: "Customer intimacy", rank: 5, fit: true, time: false, power: false, challenge: "Low", accessTo: "Strategic Partner", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: ["Strategic Partner"] },
  { id: 58, name: "Pied Piper", description: "Deceive competitors about nature of your coupling so the herd follows a false lead to your advantage.", landscape: "Cunning plans", subCategory: "", rank: 0, fit: true, time: true, power: false, challenge: "High", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 59, name: "Piggyback", description: "Couple to someone else's value proposition to exploit its market and growth.", landscape: "Small organisation", subCategory: "", rank: 5, fit: true, time: false, power: false, challenge: "Low", accessTo: "Autolycus", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: ["Autolycus"] },
  { id: 60, name: "Puppeteer", description: "Degrade others' couplings to the market by influencing the actions of a third party.", landscape: "Herd management", subCategory: "", rank: 0, fit: true, time: false, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 61, name: "Rapid Refresh", description: "Maintain the vitality of your coupling.", landscape: "Market-changing", subCategory: "Change market timing", rank: 7, fit: true, time: true, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 62, name: "Remora", description: "Tighten coupling to larger customer in order to grow.", landscape: "Supplier", subCategory: "Customer intimacy", rank: 7, fit: true, time: true, power: false, challenge: "Low", accessTo: "Jeeves", accessFrom: "", whoExecutes: "Small or medium sizes enterprises that wish to grow fast", whenExecute: "Default strategy when long term relatonship with large customer exists", whatWin: "Growth beyond medium stage, protection against market turbulence", example: "", relatedPatterns: ["Jeeves"] },
  { id: 63, name: "Rumpelstiltskin", description: "Create a new market and coupling by repurposing something worthless.", landscape: "Market-changing", subCategory: "Change value offer", rank: 6, fit: true, time: true, power: true, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 64, name: "Scapegoat", description: "Create a seperate coupling to distance a 'toxic' part of an organisation from the rest.", landscape: "Cunning plans", subCategory: "", rank: 0, fit: true, time: true, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 65, name: "Scorched Earth", description: "Deny access for competitors to build couplings to key resources.", landscape: "Defensive", subCategory: "Defend by slowing time down", rank: 16, fit: true, time: true, power: true, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "Small or large players. Small players require more concentration on key resources.", whenExecute: "Where there is long-standing competitive structure and growth strategies are constrained.", whatWin: "Wrong-foot competitors, destroy their credibility and increase market share.", example: "Sainsbury's corner the market in mascarpone cheese in response to Delia Smith TV recipe", relatedPatterns: [] },
  { id: 66, name: "Settlers", description: "Exploit others' couplng to the market with similar but cheaper offering.", landscape: "Growth", subCategory: "Grow the market", rank: 4, fit: true, time: true, power: true, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "Organisations that can monitor and prepare for end-of-life (patent expiry) of a product with a large market and revenue", whenExecute: "Ongoing", whatWin: "Access to established market with minimum R&D costs", example: "Generic drugs in pharma", relatedPatterns: [] },
  { id: 67, name: "Sheepdog", description: "Ensure adequate consistency of herd couplings to market.", landscape: "Herd management", subCategory: "", rank: 0, fit: true, time: true, power: true, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 68, name: "Standard Bearer", description: "Regulate the trajectory and speed of change in the coupling between herd and market.", landscape: "Herd management", subCategory: "", rank: 0, fit: true, time: true, power: true, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 69, name: "Stitch in Time", description: "Create coupling based on a preventative offering, supplanting the existing coupling.", landscape: "Competitive", subCategory: "Proactive", rank: 7, fit: true, time: true, power: true, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "Established problem with a clear market", whenExecute: "", whatWin: "Supplant current provider", example: "UK Fire Service", relatedPatterns: [] },
  { id: 70, name: "Strategic Partner", description: "As supplier, use your expertise to develop coupling for shared risk and reward.", landscape: "Supplier", subCategory: "", rank: 1, fit: true, time: true, power: true, challenge: "Medium", accessTo: "Jeeves", accessFrom: "", whoExecutes: "Defensively by large org or small org building relationship with larger org", whenExecute: "When both sides can benefit from partnership", whatWin: "Long-term symbiotic relationship, protection from market turbulence, continuity of income", example: "", relatedPatterns: ["Jeeves"] },
  { id: 71, name: "Streets Ahead", description: "Further develop a leading coupling to be even further head of the herd to protect your advantage.", landscape: "Competitive", subCategory: "Proactive", rank: 5, fit: true, time: true, power: true, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "Powerful org at leading edge of herd", whenExecute: "When opportunity to establish clear blue water", whatWin: "Reputation, permium market position control of herd", example: "Boeing 747 v the rest", relatedPatterns: [] },
  { id: 72, name: "Time Bandits", description: "Strengthen coupling by adding services before or after existing offering.", landscape: "Growth", subCategory: "Grow your capabilities", rank: 9, fit: true, time: true, power: false, challenge: "Low", accessTo: "Broadcast", accessFrom: "Broadcast", whoExecutes: "", whenExecute: "", whatWin: "", example: "Waterstones", relatedPatterns: ["Broadcast"] },
  { id: 73, name: "Tornado", description: "Drive the rapid capture of a growing market through your coupling.", landscape: "Growth", subCategory: "Grow the market", rank: 1, fit: true, time: true, power: true, challenge: "High", accessTo: "", accessFrom: "", whoExecutes: "Edge organisation in evolving/growing market that can operate herds as customers and other edge organisations as Strategic Partners", whenExecute: "At the point when an innovative product moves from initial sales to rapid scaling", whatWin: "Leadership in a high growth market with good margins", example: "Sat navs mid 2000s", relatedPatterns: [] },
  { id: 74, name: "Troublemaker", description: "Destabilise others' couplings for your own goals.", landscape: "Competitive", subCategory: "Proactive or reactive", rank: 6, fit: true, time: true, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "Smaller organisations who can use disruptive action", whenExecute: "At time of choosing, when you can wrong-foot actors", whatWin: "Disrupt action of others, altering intent and actions", example: "Wikileaks v US Gov", relatedPatterns: [] },
  { id: 75, name: "Troubleshooter", description: "Restore stability to anothers' coupling to their market", landscape: "Supplier", subCategory: "Technical competence", rank: 2, fit: true, time: true, power: true, challenge: "High", accessTo: "Expert", accessFrom: "", whoExecutes: "Players whose expertise and reputation are widely valued", whenExecute: "Any sector where crises happen often enough to sustain a business but not enough for others to develop skills to deal with", whatWin: "Easy defensible postion of sporadic power, sector-wide reputation", example: "Red Adair Inc.", relatedPatterns: ["Expert"] },
  { id: 76, name: "Veneer", description: "Conceal negative value given to the market through the coupling.", landscape: "Cunning plans", subCategory: "", rank: 0, fit: true, time: false, power: false, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 77, name: "Vertical Integration", description: "Create couplings between organisational units along a valiue chain to ensure delivery, quality and cost.", landscape: "Growth", subCategory: "Grow your capabilities", rank: 7, fit: true, time: true, power: true, challenge: "High", accessTo: "", accessFrom: "", whoExecutes: "Companies in defence sector", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 78, name: "Wait Out", description: "Resist change in the coupling until conditions are more favourable to you.", landscape: "Defensive", subCategory: "Defend by slowing time down", rank: 8, fit: true, time: true, power: false, challenge: "Low", accessTo: "Musk Ox", accessFrom: "Long Tail", whoExecutes: "", whenExecute: "", whatWin: "", example: "Nuclear industry", relatedPatterns: ["Musk Ox", "Long Tail"] },
  { id: 79, name: "Wolf", description: "Acquire laggards whe are weakly coupled to the herd to strip out their value.", landscape: "Herd management", subCategory: "", rank: 0, fit: true, time: true, power: true, challenge: "Medium", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] },
  { id: 80, name: "Zebra", description: "Maintain coupling as a herd member whilst pretending to be different.", landscape: "Cunning plans", subCategory: "", rank: 0, fit: true, time: false, power: false, challenge: "Low", accessTo: "", accessFrom: "", whoExecutes: "", whenExecute: "", whatWin: "", example: "", relatedPatterns: [] }
];

const App = () => {
  const [mode, setMode] = useState('simple'); // 'simple', 'advanced', 'compare', 'journey'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [showQuiz, setShowQuiz] = useState(true);
  const [compareList, setCompareList] = useState([]);
  const [journeyPath, setJourneyPath] = useState([]);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({
    goal: '',
    size: '',
    position: '',
    resources: '',
    timeline: ''
  });
  const [filters, setFilters] = useState({
    landscape: [],
    challenge: [],
    fit: null,
    time: null,
    power: null
  });

  // Get unique values for filters
  const landscapes = [...new Set(patterns.map(p => p.landscape))].filter(Boolean);
  const challenges = ['Low', 'Medium', 'High'];

  // Quiz logic for simple mode
  const getRecommendations = () => {
    if (!quizAnswers.goal) return [];
    
    let scored = patterns.map(pattern => {
      let score = 0;
      
      // Goal-based scoring
      if (quizAnswers.goal === 'grow') {
        if (pattern.landscape === 'Growth') score += 3;
        if (pattern.landscape === 'Competitive') score += 2;
      } else if (quizAnswers.goal === 'defend') {
        if (pattern.landscape === 'Defensive') score += 3;
        if (pattern.subCategory?.includes('Defend')) score += 2;
      } else if (quizAnswers.goal === 'collaborate') {
        if (pattern.landscape === 'Collaborative') score += 3;
      } else if (quizAnswers.goal === 'disrupt') {
        if (pattern.landscape === 'Market-changing') score += 3;
        if (pattern.landscape === 'Competitive') score += 2;
      } else if (quizAnswers.goal === 'supply') {
        if (pattern.landscape === 'Supplier') score += 3;
      }
      
      // Size-based scoring
      if (quizAnswers.size === 'small' && pattern.landscape === 'Small organisation') score += 2;
      if (quizAnswers.size === 'large' && pattern.whoExecutes?.toLowerCase().includes('large')) score += 1;
      
      // Position-based scoring
      if (quizAnswers.position === 'leader' && pattern.landscape === 'Herd management') score += 2;
      if (quizAnswers.position === 'challenger' && pattern.landscape === 'Competitive') score += 2;
      if (quizAnswers.position === 'niche' && pattern.name.toLowerCase().includes('niche')) score += 3;
      
      // Resource-based scoring
      if (quizAnswers.resources === 'high' && pattern.challenge === 'High') score += 1;
      if (quizAnswers.resources === 'low' && pattern.challenge === 'Low') score += 2;
      if (quizAnswers.resources === 'medium' && pattern.challenge === 'Medium') score += 1;
      
      // Timeline-based scoring
      if (quizAnswers.timeline === 'urgent' && pattern.time) score += 1;
      if (quizAnswers.timeline === 'patient' && !pattern.time) score += 1;
      
      return { ...pattern, score };
    });
    
    return scored.sort((a, b) => b.score - a.score).slice(0, 5);
  };

  // Advanced mode filtering
  const filteredPatterns = useMemo(() => {
    let result = patterns;
    
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filters.landscape.length > 0) {
      result = result.filter(p => filters.landscape.includes(p.landscape));
    }
    
    if (filters.challenge.length > 0) {
      result = result.filter(p => filters.challenge.includes(p.challenge));
    }
    
    if (filters.fit !== null) {
      result = result.filter(p => p.fit === filters.fit);
    }
    
    if (filters.time !== null) {
      result = result.filter(p => p.time === filters.time);
    }
    
    if (filters.power !== null) {
      result = result.filter(p => p.power === filters.power);
    }
    
    return result;
  }, [searchTerm, filters]);

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      if (category === 'fit' || category === 'time' || category === 'power') {
        return { ...prev, [category]: prev[category] === value ? null : value };
      }
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      landscape: [],
      challenge: [],
      fit: null,
      time: null,
      power: null
    });
    setSearchTerm('');
  };

  // Comparison functions
  const toggleCompare = (pattern) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === pattern.id);
      if (exists) {
        return prev.filter(p => p.id !== pattern.id);
      } else if (prev.length < 4) {
        return [...prev, pattern];
      }
      return prev;
    });
  };

  const isInCompareList = (patternId) => {
    return compareList.some(p => p.id === patternId);
  };

  // Journey planner functions
  const addToJourney = (pattern) => {
    if (!journeyPath.find(p => p.id === pattern.id)) {
      setJourneyPath(prev => [...prev, pattern]);
    }
  };

  const removeFromJourney = (patternId) => {
    setJourneyPath(prev => prev.filter(p => p.id !== patternId));
  };

  const getSuggestedNextPatterns = (currentPattern) => {
    if (!currentPattern) return [];
    
    // Get patterns from accessTo field
    const suggested = new Set();
    if (currentPattern.accessTo) {
      const nextPattern = patterns.find(p => p.name === currentPattern.accessTo);
      if (nextPattern) suggested.add(nextPattern);
    }
    
    // Add related patterns
    currentPattern.relatedPatterns?.forEach(name => {
      const related = patterns.find(p => p.name === name);
      if (related) suggested.add(related);
    });
    
    // Add patterns in same landscape with higher challenge
    patterns.forEach(p => {
      if (p.landscape === currentPattern.landscape && 
          p.challenge === 'High' && 
          currentPattern.challenge !== 'High') {
        suggested.add(p);
      }
    });
    
    return Array.from(suggested).slice(0, 5);
  };

  // Export functions
  const exportAsJSON = (patternsToExport) => {
    const dataStr = JSON.stringify(patternsToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'strategy-patterns.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsText = (patternsToExport) => {
    let text = 'STRATEGY PATTERNS EXPORT\n\n';
    patternsToExport.forEach((pattern, idx) => {
      text += `${idx + 1}. ${pattern.name}\n`;
      text += `   Landscape: ${pattern.landscape}\n`;
      text += `   Description: ${pattern.description}\n`;
      text += `   Challenge: ${pattern.challenge}\n`;
      if (pattern.whoExecutes) text += `   Who: ${pattern.whoExecutes}\n`;
      if (pattern.whenExecute) text += `   When: ${pattern.whenExecute}\n`;
      if (pattern.whatWin) text += `   Win: ${pattern.whatWin}\n`;
      if (pattern.example) text += `   Example: ${pattern.example}\n`;
      text += '\n';
    });
    
    const dataBlob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'strategy-patterns.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getChallengeColor = (challenge) => {
    switch(challenge) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLandscapeIcon = (landscape) => {
    switch(landscape) {
      case 'Growth': return <Icon name="TrendingUp" className="w-4 h-4" />;
      case 'Defensive': return <Icon name="Shield" className="w-4 h-4" />;
      case 'Competitive': return <Icon name="Target" className="w-4 h-4" />;
      case 'Collaborative': return <Icon name="Users" className="w-4 h-4" />;
      case 'Cunning plans': return <Icon name="Brain" className="w-4 h-4" />;
      default: return <Icon name="BookOpen" className="w-4 h-4" />;
    }
  };

  const PatternCard = ({ pattern, showScore = false, showActions = false }) => (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <div 
          className="flex items-center gap-2 flex-1 cursor-pointer"
          onClick={() => setSelectedPattern(pattern)}
        >
          {getLandscapeIcon(pattern.landscape)}
          <h3 className="font-bold text-lg text-gray-900">{pattern.name}</h3>
        </div>
        <div className="flex items-center gap-1">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getChallengeColor(pattern.challenge)}`}>
            {pattern.challenge}
          </span>
        </div>
      </div>
      
      {showScore && pattern.score > 0 && (
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(pattern.score / 10) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 font-medium">Match: {pattern.score}/10</span>
          </div>
        </div>
      )}
      
      <p 
        className="text-gray-600 text-sm mb-3 cursor-pointer"
        onClick={() => setSelectedPattern(pattern)}
      >
        {pattern.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
          {pattern.landscape}
        </span>
        {pattern.subCategory && (
          <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
            {pattern.subCategory}
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-xs text-gray-500">
          {pattern.fit && <span className="flex items-center gap-1">✓ Fit</span>}
          {pattern.time && <span className="flex items-center gap-1">⏱ Time</span>}
          {pattern.power && <span className="flex items-center gap-1">⚡ Power</span>}
        </div>
        
        {showActions && (
          <div className="flex gap-1">
            <button
              onClick={() => toggleCompare(pattern)}
              className={`p-1 rounded transition-colors ${
                isInCompareList(pattern.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isInCompareList(pattern.id) ? 'Remove from comparison' : 'Add to comparison'}
            >
              {isInCompareList(pattern.id) ? <Icon name="Minus" className="w-4 h-4" /> : <Icon name="Plus" className="w-4 h-4" />}
            </button>
            <button
              onClick={() => addToJourney(pattern)}
              className="p-1 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded transition-colors"
              title="Add to journey"
            >
              <Icon name="GitBranch" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">80 Patterns of Strategy</h1>
              <p className="text-gray-600">Based on Patrick Hoverstadt's strategic frameworks</p>
            </div>
            
            <div className="flex gap-2 items-center">
              <button
                onClick={() => { setMode('simple'); setShowQuiz(true); }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'simple' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon name="Zap" className="w-4 h-4 inline mr-2" />
                Simple
              </button>
              <button
                onClick={() => { setMode('advanced'); setShowQuiz(false); }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'advanced' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon name="Filter" className="w-4 h-4 inline mr-2" />
                Advanced
              </button>
              <button
                onClick={() => setMode('compare')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                  mode === 'compare' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon name="Target" className="w-4 h-4 inline mr-2" />
                Compare
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {compareList.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMode('journey')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                  mode === 'journey' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon name="GitBranch" className="w-4 h-4 inline mr-2" />
                Journey
                {journeyPath.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {journeyPath.length}
                  </span>
                )}
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  <Icon name="Download" className="w-4 h-4 inline mr-2" />
                  Export
                </button>
                
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <button
                      onClick={() => {
                        const toExport = mode === 'simple' && !showQuiz ? getRecommendations() : 
                                       mode === 'compare' ? compareList :
                                       mode === 'journey' ? journeyPath :
                                       filteredPatterns;
                        exportAsJSON(toExport);
                        setShowExportMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Icon name="Database" className="w-4 h-4" />
                      Export as JSON
                    </button>
                    <button
                      onClick={() => {
                        const toExport = mode === 'simple' && !showQuiz ? getRecommendations() : 
                                       mode === 'compare' ? compareList :
                                       mode === 'journey' ? journeyPath :
                                       filteredPatterns;
                        exportAsText(toExport);
                        setShowExportMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Icon name="FileText" className="w-4 h-4" />
                      Export as Text
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Simple Mode - Quiz */}
        {mode === 'simple' && showQuiz && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Strategy Pattern</h2>
            <p className="text-gray-600 mb-6">Answer a few questions to discover the most relevant strategy patterns for your situation.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What's your primary strategic goal?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: 'grow', label: 'Grow market share', icon: <Icon name="TrendingUp" className="w-5 h-5" /> },
                    { value: 'defend', label: 'Defend position', icon: <Icon name="Shield" className="w-5 h-5" /> },
                    { value: 'collaborate', label: 'Build partnerships', icon: <Icon name="Users" className="w-5 h-5" /> },
                    { value: 'disrupt', label: 'Change the market', icon: <Icon name="Zap" className="w-5 h-5" /> },
                    { value: 'supply', label: 'Supplier strategy', icon: <Icon name="Target" className="w-5 h-5" /> }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, goal: option.value }))}
                      className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                        quizAnswers.goal === option.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.icon}
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What's your organization size?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'small', label: 'Small/Startup' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large/Enterprise' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, size: option.value }))}
                      className={`p-3 border-2 rounded-lg font-medium transition-all ${
                        quizAnswers.size === option.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What's your market position?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'leader', label: 'Market Leader' },
                    { value: 'challenger', label: 'Challenger' },
                    { value: 'niche', label: 'Niche Player' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, position: option.value }))}
                      className={`p-3 border-2 rounded-lg font-medium transition-all ${
                        quizAnswers.position === option.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What resources do you have available?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'low', label: 'Limited' },
                    { value: 'medium', label: 'Moderate' },
                    { value: 'high', label: 'Substantial' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, resources: option.value }))}
                      className={`p-3 border-2 rounded-lg font-medium transition-all ${
                        quizAnswers.resources === option.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What's your timeline?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'urgent', label: 'Quick wins needed' },
                    { value: 'moderate', label: 'Balanced approach' },
                    { value: 'patient', label: 'Long-term play' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, timeline: option.value }))}
                      className={`p-3 border-2 rounded-lg font-medium transition-all ${
                        quizAnswers.timeline === option.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {quizAnswers.goal && (
                <button
                  onClick={() => setShowQuiz(false)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  See Recommended Patterns
                  <Icon name="ArrowRight" className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Simple Mode - Results */}
        {mode === 'simple' && !showQuiz && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Recommended Patterns</h2>
              <button
                onClick={() => setShowQuiz(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Retake Quiz
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {getRecommendations().map(pattern => (
                <PatternCard key={pattern.id} pattern={pattern} showScore={true} showActions={true} />
              ))}
            </div>
          </div>
        )}

        {/* Advanced Mode */}
        {mode === 'advanced' && (
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Filters</h3>
                  {(filters.landscape.length > 0 || filters.challenge.length > 0 || 
                    filters.fit !== null || filters.time !== null || filters.power !== null) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Icon name="Search" className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search patterns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Strategy Landscape */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Strategy Landscape</h4>
                  <div className="space-y-1">
                    {landscapes.map(landscape => (
                      <label key={landscape} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={filters.landscape.includes(landscape)}
                          onChange={() => toggleFilter('landscape', landscape)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{landscape}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Challenge Level */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Challenge Level</h4>
                  <div className="space-y-1">
                    {challenges.map(challenge => (
                      <label key={challenge} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                        <input
                          type="checkbox"
                          checked={filters.challenge.includes(challenge)}
                          onChange={() => toggleFilter('challenge', challenge)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getChallengeColor(challenge)}`}>
                          {challenge}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Execution Requirements */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Execution Requirements</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={filters.fit === true}
                        onChange={() => toggleFilter('fit', true)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Requires Fit</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={filters.time === true}
                        onChange={() => toggleFilter('time', true)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Time Sensitive</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={filters.power === true}
                        onChange={() => toggleFilter('power', true)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Requires Power</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredPatterns.length}</span> of <span className="font-semibold">{patterns.length}</span> patterns
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {filteredPatterns.map(pattern => (
                  <PatternCard key={pattern.id} pattern={pattern} showActions={true} />
                ))}
              </div>

              {filteredPatterns.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No patterns match your filters</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Compare Mode */}
        {mode === 'compare' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Compare Patterns</h2>
              <p className="text-gray-600">
                {compareList.length === 0 && "Add patterns from other modes to compare them side-by-side (max 4)."}
                {compareList.length > 0 && `Comparing ${compareList.length} pattern${compareList.length > 1 ? 's' : ''}. Add more from Simple or Advanced modes.`}
              </p>
            </div>

            {compareList.length === 0 ? (
              <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                <Icon name="Target" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Patterns Selected</h3>
                <p className="text-gray-500 mb-4">Switch to Simple or Advanced mode and click the + button on patterns to add them for comparison.</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setMode('simple')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go to Simple Mode
                  </button>
                  <button
                    onClick={() => setMode('advanced')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Go to Advanced Mode
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <button
                    onClick={() => setCompareList([])}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-48">Attribute</th>
                        {compareList.map(pattern => (
                          <th key={pattern.id} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 min-w-64">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getLandscapeIcon(pattern.landscape)}
                                <span>{pattern.name}</span>
                              </div>
                              <button
                                onClick={() => toggleCompare(pattern)}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <Icon name="X" className="w-4 h-4" />
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">Description</td>
                        {compareList.map(pattern => (
                          <td key={pattern.id} className="px-4 py-3 text-sm text-gray-600">{pattern.description}</td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">Strategy Landscape</td>
                        {compareList.map(pattern => (
                          <td key={pattern.id} className="px-4 py-3">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                              {pattern.landscape}
                            </span>
                          </td>
                        ))}
                      </tr>
                      {compareList.some(p => p.subCategory) && (
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-700">Sub-category</td>
                          {compareList.map(pattern => (
                            <td key={pattern.id} className="px-4 py-3 text-sm text-gray-600">
                              {pattern.subCategory || '-'}
                            </td>
                          ))}
                        </tr>
                      )}
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">Challenge Level</td>
                        {compareList.map(pattern => (
                          <td key={pattern.id} className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getChallengeColor(pattern.challenge)}`}>
                              {pattern.challenge}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">Requirements</td>
                        {compareList.map(pattern => (
                          <td key={pattern.id} className="px-4 py-3">
                            <div className="flex flex-col gap-1 text-xs">
                              <span className={pattern.fit ? 'text-green-600' : 'text-gray-400'}>
                                {pattern.fit ? '✓' : '○'} Fit
                              </span>
                              <span className={pattern.time ? 'text-green-600' : 'text-gray-400'}>
                                {pattern.time ? '✓' : '○'} Time
                              </span>
                              <span className={pattern.power ? 'text-green-600' : 'text-gray-400'}>
                                {pattern.power ? '✓' : '○'} Power
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">Who Can Execute</td>
                        {compareList.map(pattern => (
                          <td key={pattern.id} className="px-4 py-3 text-sm text-gray-600">
                            {pattern.whoExecutes || '-'}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">When to Execute</td>
                        {compareList.map(pattern => (
                          <td key={pattern.id} className="px-4 py-3 text-sm text-gray-600">
                            {pattern.whenExecute || '-'}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">What You Win</td>
                        {compareList.map(pattern => (
                          <td key={pattern.id} className="px-4 py-3 text-sm text-gray-600">
                            {pattern.whatWin || '-'}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">Example</td>
                        {compareList.map(pattern => (
                          <td key={pattern.id} className="px-4 py-3 text-sm text-gray-600 italic">
                            {pattern.example || '-'}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">Related Patterns</td>
                        {compareList.map(pattern => (
                          <td key={pattern.id} className="px-4 py-3 text-sm text-gray-600">
                            {pattern.relatedPatterns?.length > 0 ? pattern.relatedPatterns.join(', ') : '-'}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Journey Planner Mode */}
        {mode === 'journey' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Strategy Journey Planner</h2>
              <p className="text-gray-600">
                Build a strategic pathway by adding patterns in sequence. We'll suggest natural progressions.
              </p>
            </div>

            {journeyPath.length === 0 ? (
              <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                <Icon name="GitBranch" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Your Journey</h3>
                <p className="text-gray-500 mb-4">Switch to Simple or Advanced mode and click the journey button on patterns to start building your strategic path.</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setMode('simple')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go to Simple Mode
                  </button>
                  <button
                    onClick={() => setMode('advanced')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Go to Advanced Mode
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Your Strategic Path</h3>
                  <button
                    onClick={() => setJourneyPath([])}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Path
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="space-y-4">
                    {journeyPath.map((pattern, idx) => (
                      <div key={pattern.id}>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                          </div>
                          
                          <div className="flex-1 bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getLandscapeIcon(pattern.landscape)}
                                <h4 className="font-bold text-lg text-gray-900">{pattern.name}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getChallengeColor(pattern.challenge)}`}>
                                  {pattern.challenge}
                                </span>
                              </div>
                              <button
                                onClick={() => removeFromJourney(pattern.id)}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <Icon name="X" className="w-5 h-5" />
                              </button>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{pattern.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                {pattern.landscape}
                              </span>
                              {pattern.subCategory && (
                                <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                                  {pattern.subCategory}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {idx < journeyPath.length - 1 && (
                          <div className="ml-4 my-2">
                            <div className="w-0.5 h-8 bg-blue-300"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {journeyPath.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Next Steps</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Based on your current pattern ({journeyPath[journeyPath.length - 1].name}), here are natural progressions:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {getSuggestedNextPatterns(journeyPath[journeyPath.length - 1]).map(pattern => (
                        <div
                          key={pattern.id}
                          className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => addToJourney(pattern)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getLandscapeIcon(pattern.landscape)}
                              <h4 className="font-semibold text-gray-900">{pattern.name}</h4>
                            </div>
                            <Icon name="Plus" className="w-5 h-5 text-blue-600" />
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getChallengeColor(pattern.challenge)}`}>
                            {pattern.challenge}
                          </span>
                        </div>
                      ))}
                      
                      {getSuggestedNextPatterns(journeyPath[journeyPath.length - 1]).length === 0 && (
                        <div className="col-span-2 text-center py-8 text-gray-500">
                          No specific suggestions. Explore other modes to add more patterns to your journey.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pattern Detail Modal */}
      {selectedPattern && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedPattern(null)}>
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getLandscapeIcon(selectedPattern.landscape)}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPattern.name}</h2>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium">
                      {selectedPattern.landscape}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${getChallengeColor(selectedPattern.challenge)}`}>
                      {selectedPattern.challenge} Challenge
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedPattern(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="X" className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedPattern.description}</p>
              </div>

              {selectedPattern.subCategory && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Sub-category</h3>
                  <p className="text-gray-700">{selectedPattern.subCategory}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Execution Requirements</h3>
                <div className="flex gap-4">
                  <span className={`px-3 py-1 rounded ${selectedPattern.fit ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                    {selectedPattern.fit ? '✓' : '○'} Fit Required
                  </span>
                  <span className={`px-3 py-1 rounded ${selectedPattern.time ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                    {selectedPattern.time ? '✓' : '○'} Time Sensitive
                  </span>
                  <span className={`px-3 py-1 rounded ${selectedPattern.power ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                    {selectedPattern.power ? '✓' : '○'} Power Required
                  </span>
                </div>
              </div>

              {selectedPattern.whoExecutes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Who Can Execute?</h3>
                  <p className="text-gray-700">{selectedPattern.whoExecutes}</p>
                </div>
              )}

              {selectedPattern.whenExecute && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">When to Execute?</h3>
                  <p className="text-gray-700">{selectedPattern.whenExecute}</p>
                </div>
              )}

              {selectedPattern.whatWin && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What Do You Win?</h3>
                  <p className="text-gray-700">{selectedPattern.whatWin}</p>
                </div>
              )}

              {selectedPattern.example && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Example</h3>
                  <p className="text-gray-700 italic">{selectedPattern.example}</p>
                </div>
              )}

              {selectedPattern.relatedPatterns && selectedPattern.relatedPatterns.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Related Patterns</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPattern.relatedPatterns.map(relatedName => {
                      const related = patterns.find(p => p.name === relatedName);
                      return related ? (
                        <button
                          key={related.id}
                          onClick={() => setSelectedPattern(related)}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                        >
                          {related.name}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
