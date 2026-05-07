"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Info, Hexagon, Factory, FlaskConical, Droplets, Leaf, Activity, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- DATASET: VISHVAK CHEMIX ---
const VISHVAK_DATA = {
  name: "Vishvak Chemix",
  tagline: "Where Chemistry Drives Change",
  categories: [
    {
      id: "cat_agri",
      name: "Agriculture",
      icon: Leaf,
      color: "#10B981", // Emerald
      products: [
        { name: "Technical Grade Urea", formula: "CH4N2O", cas: "57-13-6", desc: "High-purity nitrogen fertilizer and industrial raw material." },
        { name: "Potassium Chloride", formula: "KCl", cas: "7447-40-7", desc: "Used in fertilizers, scientific applications, and food processing." },
        { name: "Copper Sulphate", formula: "CuSO4", cas: "7758-98-7", desc: "Fungicide, algaecide, root killer, and herbicide." },
        { name: "Magnesium Sulphate", formula: "MgSO4", cas: "7487-88-9", desc: "Used in agriculture to correct magnesium or sulfur deficiency in soil." },
        { name: "Boric Acid", formula: "H3BO3", cas: "10043-35-3", desc: "Provides boron, an essential micronutrient for plant growth." }
      ]
    },
    {
      id: "cat_pharma",
      name: "Pharmaceuticals",
      icon: Activity,
      color: "#3B82F6", // Blue
      products: [
        { name: "Hydrochloric Acid", formula: "HCl", cas: "7647-01-0", desc: "Used as an acidifier, in neutralizing alkaline agents, and as a catalyst." },
        { name: "Sulphuric Acid", formula: "H2SO4", cas: "7664-93-9", desc: "Crucial in the manufacture of drugs and intermediate chemicals." },
        { name: "Acetic Acid", formula: "CH3COOH", cas: "64-19-7", desc: "Used in the production of vitamins, antibiotics, and hormones." },
        { name: "Ethanol", formula: "C2H5OH", cas: "64-17-5", desc: "Widely used as a solvent and preservative in pharmaceutical preparations." },
        { name: "Phenol", formula: "C6H5OH", cas: "108-95-2", desc: "Precursor to many drugs, including aspirin and various oral analgesics." },
        { name: "Zinc Oxide", formula: "ZnO", cas: "1314-13-2", desc: "Used in ointments, creams, and lotions to protect against sunburn." }
      ]
    },
    {
      id: "cat_food",
      name: "Food & Beverage",
      icon: Droplets,
      color: "#F59E0B", // Amber
      products: [
        { name: "Citric Acid", formula: "C6H8O7", cas: "77-92-9", desc: "Natural preservative and flavoring agent in food and beverages." },
        { name: "Sodium Bicarbonate", formula: "NaHCO3", cas: "144-55-8", desc: "Baking soda, used as a leavening agent." },
        { name: "Phosphoric Acid", formula: "H3PO4", cas: "7664-38-2", desc: "Acidifying agent to give colas their tangy flavor." },
        { name: "Calcium Carbonate", formula: "CaCO3", cas: "471-34-1", desc: "Used as a food additive, dietary calcium supplement, and antacid." }
      ]
    },
    {
      id: "cat_industrial",
      name: "Industrial & Auto",
      icon: Factory,
      color: "#F97316", // Vishvak Orange
      products: [
        { name: "Diesel Exhaust Fluid", formula: "CH4N2O + H2O", cas: "Mixture", desc: "AdBlue. Reduces NOx emissions in diesel engines." },
        { name: "Soda Ash", formula: "Na2CO3", cas: "497-19-8", desc: "Glass manufacturing, metallurgy, and chemical synthesis." },
        { name: "Nitric Acid", formula: "HNO3", cas: "7697-37-2", desc: "Production of fertilizers and explosives." },
        { name: "Dicalcium Phosphate", formula: "CaHPO4", cas: "7789-77-7", desc: "Used in animal feed and toothpaste formulation." }
      ]
    },
    {
      id: "cat_paints",
      name: "Paints & Plastics",
      icon: FlaskConical,
      color: "#8B5CF6", // Purple
      products: [
        { name: "Titanium Dioxide", formula: "TiO2", cas: "13463-67-7", desc: "White pigment used in paints, coatings, and plastics." },
        { name: "Methanol", formula: "CH3OH", cas: "67-56-1", desc: "Solvent and raw material for formaldehyde production." },
        { name: "Toluene", formula: "C7H8", cas: "108-88-3", desc: "Common solvent in paints, thinners, and adhesives." },
        { name: "Formaldehyde", formula: "CH2O", cas: "50-00-0", desc: "Used in resins for wood products and plastics." },
        { name: "Acetone", formula: "C3H6O", cas: "67-64-1", desc: "Fast-evaporating solvent for plastics and synthetic fibers." },
        { name: "Caustic Soda Flakes", formula: "NaOH", cas: "1310-73-2", desc: "Used in paper making, textile processing, and chemical production." }
      ]
    }
  ]
};

// --- FLATTEN DATA FOR SEARCH ---
const allProductsList = VISHVAK_DATA.categories.flatMap(c => 
  c.products.map(p => ({ ...p, categoryName: c.name, categoryColor: c.color }))
);

// --- CANVAS MOLECULE COMPONENT ---
const MoleculeNetwork = ({ onNodeSelect, selectedNode, searchQuery }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    
    // Physics & Layout state
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    
    let time = 0;
    const mouse = { x: -1000, y: -1000, isHovering: false };
    
    // Nodes construction
    const rootNode: any = { id: 'root', label: 'Vishvak', type: 'root', color: '#F97316', radius: 40, x: centerX, y: centerY };
    
    const nodes: any[] = [rootNode];
    const links: any[] = [];
    
    // Orbit Radii
    const R1 = Math.min(width, height) * 0.28; // Categories orbit distance
    const R2 = Math.min(width, height) * 0.18; // Products orbit distance
    
    VISHVAK_DATA.categories.forEach((cat, i) => {
      const catAngleOffset = (i / VISHVAK_DATA.categories.length) * Math.PI * 2;
      const catNode = {
        ...cat,
        type: 'category',
        angleOffset: catAngleOffset,
        radius: 25,
        targetR1: R1,
        x: 0,
        y: 0
      };
      nodes.push(catNode);
      links.push({ source: rootNode, target: catNode, type: 'primary' });
      
      cat.products.forEach((prod, j) => {
        const prodAngleOffset = (j / cat.products.length) * Math.PI * 2;
        const prodNode = {
          ...prod,
          type: 'product',
          categoryColor: cat.color,
          angleOffset: prodAngleOffset,
          parent: catNode,
          radius: 8,
          targetR2: R2,
          x: 0,
          y: 0
        };
        nodes.push(prodNode);
        links.push({ source: catNode, target: prodNode, type: 'secondary' });
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleClick = () => {
      let clickedNode = null;
      // Check from top (smallest nodes) to bottom (root)
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        if (dx*dx + dy*dy <= (n.radius * 2) * (n.radius * 2)) {
          clickedNode = n;
          break;
        }
      }
      
      if (clickedNode && clickedNode.type !== 'root') {
        onNodeSelect(clickedNode);
      } else {
        onNodeSelect(null);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    const draw = () => {
      // Clear with corporate navy blue, slight trail effect
      ctx.fillStyle = 'rgba(10, 25, 47, 0.4)';
      ctx.fillRect(0, 0, width, height);

      time += 0.002;
      mouse.isHovering = false;
      let hoveredNode: any = null;

      // 1. Calculate Positions
      nodes.forEach(n => {
        if (n.type === 'root') {
          // Slight parallax for root based on mouse
          const targetX = centerX + (centerX - mouse.x) * 0.02;
          const targetY = centerY + (centerY - mouse.y) * 0.02;
          n.x = n.x ? n.x + (targetX - n.x) * 0.1 : centerX;
          n.y = n.y ? n.y + (targetY - n.y) * 0.1 : centerY;
        } else if (n.type === 'category') {
          // Slowly orbit root
          const angle = time + n.angleOffset;
          // Dynamic radius (expand if searched/selected)
          const currentR1 = (searchQuery || selectedNode) ? R1 * 1.5 : R1;
          n.x = rootNode.x + Math.cos(angle) * currentR1;
          n.y = rootNode.y + Math.sin(angle) * currentR1;
        } else if (n.type === 'product') {
          // Counter-orbit around category
          const angle = -time * 2 + n.angleOffset;
          const isHighlighted = searchQuery && n.name.toLowerCase().includes(searchQuery.toLowerCase());
          const isSelected = selectedNode && (selectedNode.name === n.name || selectedNode.name === n.parent.name);
          
          let currentR2 = R2;
          if (isHighlighted || isSelected) {
             currentR2 = R2 * 1.2;
          }

          n.x = n.parent.x + Math.cos(angle) * currentR2;
          n.y = n.parent.y + Math.sin(angle) * currentR2;
        }

        // Check Hover
        if (n.type !== 'root') {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          if (dx*dx + dy*dy <= n.radius * n.radius * 4) {
            mouse.isHovering = true;
            hoveredNode = n;
          }
        }
      });

      canvas.style.cursor = mouse.isHovering ? 'pointer' : 'default';

      // 2. Draw Links
      links.forEach(l => {
        ctx.beginPath();
        ctx.moveTo(l.source.x, l.source.y);
        ctx.lineTo(l.target.x, l.target.y);
        
        let isHighlighted = false;
        
        if (hoveredNode) {
          if (l.target === hoveredNode || l.source === hoveredNode || l.target.parent === hoveredNode) {
            isHighlighted = true;
          }
        } else if (selectedNode) {
            if (l.target.name === selectedNode.name || l.source.name === selectedNode.name || l.target.parent?.name === selectedNode.name) {
                isHighlighted = true;
            }
        } else if (searchQuery) {
            if (l.target.type === 'product' && l.target.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                 isHighlighted = true;
            }
        }

        if (l.type === 'primary') {
          ctx.strokeStyle = isHighlighted ? l.target.color : 'rgba(255,255,255,0.1)';
          ctx.lineWidth = isHighlighted ? 3 : 1.5;
        } else {
           ctx.strokeStyle = isHighlighted ? l.source.color : 'rgba(255,255,255,0.05)';
           ctx.lineWidth = isHighlighted ? 2 : 0.5;
        }
        
        ctx.stroke();
      });

      // 3. Draw Nodes
      nodes.forEach(n => {
        let isHovered = (hoveredNode === n);
        let isHighlighted = false;

        if (searchQuery && n.type === 'product' && n.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            isHighlighted = true;
        }
        if (selectedNode && (selectedNode.name === n.name || (n.parent && selectedNode.name === n.parent.name))) {
            isHighlighted = true;
        }

        ctx.beginPath();
        
        const drawRadius = (isHovered || isHighlighted) ? n.radius * 1.5 : n.radius;

        ctx.arc(n.x, n.y, drawRadius, 0, Math.PI * 2);
        
        if (n.type === 'root') {
          // Core Branding styling
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, drawRadius);
          grad.addColorStop(0, '#F97316'); // Vishvak Orange
          grad.addColorStop(1, '#9A3412');
          ctx.fillStyle = grad;
          ctx.shadowColor = '#F97316';
          ctx.shadowBlur = 30;
          ctx.fill();
          ctx.shadowBlur = 0; // Reset
          
          // Draw "V" logo text
          ctx.fillStyle = 'white';
          ctx.font = 'bold 24px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('V', n.x, n.y);
          
        } else if (n.type === 'category') {
          ctx.fillStyle = n.color;
          ctx.shadowColor = n.color;
          ctx.shadowBlur = isHovered ? 20 : 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Always draw category labels
          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.font = '600 12px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(n.name, n.x, n.y + drawRadius + 15);

        } else if (n.type === 'product') {
          ctx.fillStyle = (isHovered || isHighlighted) ? n.categoryColor : 'rgba(255,255,255,0.4)';
          ctx.fill();
          
          if (isHovered || isHighlighted) {
            ctx.shadowColor = n.categoryColor;
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Draw Product Label
            ctx.fillStyle = 'white';
            ctx.font = '500 11px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(n.name, n.x, n.y + drawRadius + 12);
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [onNodeSelect, searchQuery, selectedNode]);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-[#0A192F] overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

// --- MAIN APPLICATION SECTION ---
export default function InteractiveExplorer() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleProductNavigation = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    router.push(`/products/${slug}`);
  };

  return (
    <section className="relative w-full h-screen font-sans text-slate-100 overflow-hidden bg-[#0A192F]" id="explorer">
      
      {/* 3D Animated Molecule Canvas */}
      <MoleculeNetwork 
        onNodeSelect={setSelectedNode} 
        selectedNode={selectedNode}
        searchQuery={searchQuery}
      />

      {/* TOP COMPONENT BRANDING / SEARCH */}
      <div className="absolute top-0 left-0 w-full p-8 flex flex-col md:flex-row justify-between items-start pointer-events-none z-10 gap-4">
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.5)]">
                <Hexagon className="text-white w-6 h-6" />
             </div>
             <div>
               <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
                 Interactive <span className="text-accent">Explorer</span>
               </h2>
             </div>
          </div>
          <p className="text-blue-200 text-xs md:text-sm tracking-widest pl-13 font-medium opacity-80 uppercase">
             Navigate our chemical portfolio
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="pointer-events-auto relative w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search (e.g. Urea, Methanol)..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full md:w-80 bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm text-white placeholder-blue-300/50 backdrop-blur-md focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all shadow-lg"
            />
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-blue-300/50" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-blue-300/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Quick Search Results Dropdown */}
          {searchQuery && (
             <div className="absolute top-14 left-0 w-full bg-[#0d2240] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-20 backdrop-blur-xl">
               {allProductsList.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                 <div className="p-4 text-sm text-slate-400">No chemicals found.</div>
               ) : (
                 allProductsList.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((p, idx) => (
                   <button
                     key={idx}
                     onClick={() => {
                        setSelectedNode({...p, type: 'product'});
                        setSearchQuery('');
                     }}
                     className="w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 text-sm flex justify-between items-center transition-colors"
                   >
                     <span>{p.name}</span>
                     <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{backgroundColor: `${p.categoryColor}20`, color: p.categoryColor}}>
                       {p.categoryName}
                     </span>
                   </button>
                 ))
               )}
             </div>
          )}
        </div>
      </div>

      {/* SIDEBAR - DETAILS PANEL */}
      <div 
        className={`absolute top-0 right-0 h-full w-full md:w-96 bg-[#0f2445]/95 backdrop-blur-2xl border-l border-white/10 p-8 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 shadow-2xl ${selectedNode ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {selectedNode && (
          <div className="h-full flex flex-col pointer-events-auto">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedNode(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedNode.type === 'category' ? (
              // CATEGORY VIEW
              <div className="mt-8 animate-in fade-in slide-in-from-right-4 duration-500 overflow-y-auto pr-2 pb-8">
                <div 
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${selectedNode.color}20`, border: `1px solid ${selectedNode.color}50` }}
                >
                  <selectedNode.icon className="w-8 h-8" style={{ color: selectedNode.color }} />
                </div>
                <h2 className="text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: selectedNode.color }}>Industry Sector</h2>
                <h3 className="text-3xl font-bold text-white mb-6">{selectedNode.name}</h3>
                
                <div className="bg-white/5 rounded-xl p-5 border border-white/5 mb-6">
                   <p className="text-slate-300 text-sm leading-relaxed">
                     Core chemical supplies and raw materials designated for the {selectedNode.name.toLowerCase()} sector. Click on individual nodes to view specific chemical profiles.
                   </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-4 flex items-center gap-2">
                    <Activity className="w-3 h-3" /> Associated Products ({selectedNode.products.length})
                  </h4>
                  <ul className="space-y-2">
                    {selectedNode.products.map((p: any, idx: number) => (
                      <li key={idx} className="bg-[#0a192f] border border-white/5 px-4 py-3 rounded-lg text-sm text-slate-200 cursor-pointer hover:border-white/20 transition-colors"
                          onClick={() => setSelectedNode({...p, type: 'product', categoryName: selectedNode.name, categoryColor: selectedNode.color})}>
                        {p.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              // PRODUCT VIEW
              <div className="mt-8 flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500 overflow-y-auto pb-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="w-3 h-8 rounded-full" style={{ backgroundColor: selectedNode.categoryColor }}></div>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: selectedNode.categoryColor }}>
                    {selectedNode.categoryName || (selectedNode.parent && selectedNode.parent.name) || 'Chemical Product'}
                  </span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{selectedNode.name}</h3>
                
                <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Formula</span>
                    <span className="font-mono text-lg text-accent font-semibold">{selectedNode.formula}</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">CAS Number</span>
                    <span className="font-mono text-lg text-white font-medium">{selectedNode.cas}</span>
                  </div>
                </div>

                <div className="bg-[#0a192f] rounded-xl p-6 border border-white/5 flex-grow mb-6">
                  <h4 className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4" /> Description & Application
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedNode.desc}
                  </p>
                </div>

                <button 
                  onClick={() => handleProductNavigation(selectedNode.name)}
                  className="mt-auto w-full py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all transform hover:-translate-y-1"
                >
                  View Full Product Details
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* BOTTOM LEFT INDICATOR */}
      <div className="absolute bottom-6 left-6 pointer-events-none flex items-center gap-3">
        <div className="flex gap-1.5">
           <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
           <span className="w-2 h-2 rounded-full bg-accent/50 animate-pulse" style={{animationDelay: '0.2s'}}></span>
           <span className="w-2 h-2 rounded-full bg-accent/20 animate-pulse" style={{animationDelay: '0.4s'}}></span>
        </div>
        <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">Explorer Active</span>
      </div>

    </section>
  );
}
