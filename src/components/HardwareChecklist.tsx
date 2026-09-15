import React, { useState, useEffect } from 'react';
import { INITIAL_HARDWARE_INVENTORY } from '../data/proposalData';
import { HardwareItem } from '../types';
import { CheckCircle2, Clock, AlertCircle, Plus, Trash2, Cpu, Wrench } from 'lucide-react';

export const HardwareChecklist: React.FC = () => {
  const [items, setItems] = useState<HardwareItem[]>(() => {
    try {
      const saved = localStorage.getItem('jetson_proposal_hw_items');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_HARDWARE_INVENTORY;
  });

  const [newItemName, setNewItemName] = useState('');
  const [newItemSpec, setNewItemSpec] = useState('');
  const [newItemInterface, setNewItemInterface] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('jetson_proposal_hw_items', JSON.stringify(items));
    } catch (e) {
      // storage error
    }
  }, [items]);

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextStatus: Record<string, HardwareItem['status']> = {
          pending: 'procured',
          procured: 'testing',
          testing: 'ready',
          ready: 'pending'
        };
        return { ...item, status: nextStatus[item.status] };
      })
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem: HardwareItem = {
      id: `hw-custom-${Date.now()}`,
      name: newItemName.trim(),
      category: 'peripherals',
      specification: newItemSpec.trim() || 'Custom edge component',
      status: 'pending',
      notes: 'Added to working lab guide checklist.',
      interfaceType: newItemInterface.trim() || 'General GPIO/USB'
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemSpec('');
    setNewItemInterface('');
    setShowAddForm(false);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const readyCount = items.filter((i) => i.status === 'ready').length;
  const progressPercent = Math.round((readyCount / items.length) * 100);

  const getStatusBadge = (status: HardwareItem['status']) => {
    switch (status) {
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Ready / Verified
          </span>
        );
      case 'testing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" /> In Bench Testing
          </span>
        );
      case 'procured':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" /> Procured
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700">
            <AlertCircle className="w-3 h-3" /> Pending Sourcing
          </span>
        );
    }
  };

  return (
    <div id="hardware-checklist-container" className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            Hardware Setup Checklist &amp; Bill of Materials
          </div>
          <h3 className="text-lg font-bold text-zinc-100 tracking-tight mt-1">
            Jetson Nano Carrier Board &amp; Sensor Array Verification
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-mono text-zinc-400">Lab Readiness</div>
            <div className="text-sm font-mono font-bold text-emerald-400">
              {readyCount} of {items.length} Ready ({progressPercent}%)
            </div>
          </div>
          <button
            id="toggle-add-hardware-btn"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Item
          </button>
        </div>
      </div>

      {/* Progress line */}
      <div className="w-full bg-zinc-950 h-2 rounded-full mt-4 overflow-hidden border border-zinc-800">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Add Custom Item Modal/Form */}
      {showAddForm && (
        <form onSubmit={handleAddItem} className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="text-xs font-mono uppercase text-emerald-400 font-semibold">
            Add Hardware Component to Lab Checklist
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Component name (e.g., USB LIDAR)"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
              required
            />
            <input
              type="text"
              placeholder="Specification details"
              value={newItemSpec}
              onChange={(e) => setNewItemSpec(e.target.value)}
              className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Interface (e.g. UART / USB3)"
              value={newItemInterface}
              onChange={(e) => setNewItemInterface(e.target.value)}
              className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-zinc-950 font-mono text-xs font-bold hover:bg-emerald-400"
            >
              Save to Checklist
            </button>
          </div>
        </form>
      )}

      {/* Hardware Items List */}
      <div className="mt-4 space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:bg-zinc-950 transition-colors"
          >
            <div className="flex items-start gap-3 min-w-0">
              <button
                id={`toggle-item-${item.id}`}
                onClick={() => toggleStatus(item.id)}
                title="Click to cycle status: Pending -> Procured -> Testing -> Ready"
                className="mt-0.5 text-zinc-500 hover:text-emerald-400 transition-colors shrink-0"
              >
                {item.status === 'ready' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-zinc-700 hover:border-emerald-500" />
                )}
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-100">{item.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {item.interfaceType}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">{item.specification}</div>
                {item.notes && (
                  <div className="text-[11px] font-mono text-zinc-500 mt-1 italic">
                    Note: {item.notes}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => toggleStatus(item.id)}
                className="cursor-pointer focus:outline-none"
              >
                {getStatusBadge(item.status)}
              </button>
              {item.id.startsWith('hw-custom-') && (
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-1 text-zinc-600 hover:text-red-400 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
