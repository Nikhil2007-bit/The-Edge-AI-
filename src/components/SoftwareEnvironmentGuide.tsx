import React, { useState } from 'react';
import { SOFTWARE_COMPONENTS } from '../data/proposalData';
import { Terminal, Copy, Check, ExternalLink, ShieldCheck, Box } from 'lucide-react';

export const SoftwareEnvironmentGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const dockerQuickstart = `# 1. Pull optimized Jetson Nano base image
sudo docker pull nvcr.io/nvidia/l4t-ml:r32.7.1-py3

# 2. Launch container with GPU runtime and CSI camera access
sudo docker run --runtime nvidia -it --rm \\
  --network host \\
  --volume /tmp/argus_socket:/tmp/argus_socket \\
  --device /dev/video0 \\
  nvcr.io/nvidia/l4t-ml:r32.7.1-py3

# 3. Test TensorRT & OpenUSD inside container
python3 -c "import tensorrt as trt; print('TensorRT Version:', trt.__version__)"
python3 -c "from pxr import Usd; print('OpenUSD Stage Ready:', Usd.__file__)"`;

  return (
    <div id="software-guide-card" className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">
            <Box className="w-3.5 h-3.5" />
            Software Stack &amp; Environment Setup
          </div>
          <h3 className="text-lg font-bold text-zinc-100 tracking-tight mt-1">
            JetPack SDK, TensorRT &amp; OpenUSD Runtime Recipe
          </h3>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-400">
          OS: Ubuntu 18.04 LTS (L4T 32.7.1)
        </span>
      </div>

      {/* Software Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-5">
        {SOFTWARE_COMPONENTS.map((comp) => (
          <div
            key={comp.name}
            className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/60 hover:bg-zinc-950 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-zinc-100">{comp.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {comp.version}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                {comp.role}
              </p>
            </div>

            {comp.commandSnippet && (
              <div className="mt-3 pt-3 border-t border-zinc-800/70 flex items-center justify-between gap-2">
                <div className="font-mono text-[11px] text-zinc-300 truncate bg-zinc-900 px-2 py-1 rounded w-full border border-zinc-800">
                  <span className="text-emerald-400 mr-1">$</span>
                  {comp.commandSnippet}
                </div>
                <button
                  onClick={() => handleCopy(comp.commandSnippet!, comp.name)}
                  className="p-1.5 text-zinc-400 hover:text-emerald-400 rounded hover:bg-zinc-900 shrink-0 transition-colors"
                  title="Copy verification command"
                >
                  {copiedCmd === comp.name ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Docker Quickstart Container Recipe */}
      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800 mb-3">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Reproducible Docker Container Workflow</span>
          </div>
          <button
            onClick={() => handleCopy(dockerQuickstart, 'docker-script')}
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-emerald-400"
          >
            {copiedCmd === 'docker-script' ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Script</span>
              </>
            )}
          </button>
        </div>
        <pre className="text-[11px] text-zinc-300 overflow-x-auto leading-relaxed p-2 rounded bg-zinc-900/40">
          <code>{dockerQuickstart}</code>
        </pre>
      </div>
    </div>
  );
};
