import { headers } from "next/headers";
import { userAgent } from "next/server";
import os from "os";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Agent Inspector | Learning Next.js",
  description:
    "Inspect all HTTP request headers and parsed user agent information using Next.js Server Components.",
};

// ---------- helpers ----------

function Badge({
  children,
  color = "indigo",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const map: Record<string, string> = {
    indigo: "bg-indigo-500/20 text-indigo-300 ring-indigo-500/30",
    emerald: "bg-emerald-500/20 text-emerald-300 ring-emerald-500/30",
    rose: "bg-rose-500/20 text-rose-300 ring-rose-500/30",
    amber: "bg-amber-500/20 text-amber-300 ring-amber-500/30",
    sky: "bg-sky-500/20 text-sky-300 ring-sky-500/30",
    violet: "bg-violet-500/20 text-violet-300 ring-violet-500/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${map[color] ?? map.indigo}`}
    >
      {children}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-white/5 last:border-0">
      <span className="text-sm text-slate-400 shrink-0 w-32">{label}</span>
      <span className="text-sm text-slate-100 font-mono text-right break-all">
        {value || <span className="text-slate-600 italic">undefined</span>}
      </span>
    </div>
  );
}

function Card({
  title,
  icon,
  children,
  accent = "indigo",
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  accent?: string;
}) {
  const border: Record<string, string> = {
    indigo: "border-indigo-500/20",
    emerald: "border-emerald-500/20",
    rose: "border-rose-500/20",
    amber: "border-amber-500/20",
    sky: "border-sky-500/20",
    violet: "border-violet-500/20",
  };
  const glow: Record<string, string> = {
    indigo: "shadow-indigo-500/5",
    emerald: "shadow-emerald-500/5",
    rose: "shadow-rose-500/5",
    amber: "shadow-amber-500/5",
    sky: "shadow-sky-500/5",
    violet: "shadow-violet-500/5",
  };
  return (
    <div
      className={`rounded-2xl bg-white/[0.03] border ${border[accent]} shadow-lg ${glow[accent]} p-5`}
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

// ---------- page ----------

export default async function UserAgentPage() {
  // 1. Read all headers (async in Next.js 15+)
  const headersList = await headers();

  // 2. Parse userAgent — needs a Request-like object with a 'user-agent' header
  const uaString = headersList.get("user-agent") ?? "";
  const ua = userAgent({ headers: new Headers({ "user-agent": uaString }) });

  // 3. Collect all raw headers into a sorted array
  const allHeaders: { name: string; value: string }[] = [];
  headersList.forEach((value, name) => {
    allHeaders.push({ name, value });
  });
  allHeaders.sort((a, b) => a.name.localeCompare(b.name));

  // 4. Server info via Node.js os module (server process, NOT the visitor)
  const serverInfo = os.userInfo();
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverArch = os.arch();

  // Helper display values
  const deviceType = ua.device.type ?? "desktop";
  const isBot = ua.isBot;

  return (
    <main className="min-h-screen bg-[#080b14] text-slate-100 px-4 py-12">
      {/* ── Hero ── */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-xs text-indigo-300 mb-6">
          <span className="animate-pulse h-1.5 w-1.5 rounded-full bg-indigo-400 inline-block" />
          Live · Server-rendered on every request
        </div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
          User Agent Inspector
        </h1>
        <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
          All data below is read on the server using{" "}
          <code className="text-indigo-300 bg-indigo-950/50 px-1 rounded">
            headers()
          </code>{" "}
          and{" "}
          <code className="text-indigo-300 bg-indigo-950/50 px-1 rounded">
            userAgent()
          </code>{" "}
          from Next.js — no JavaScript runs on the client to produce this.
        </p>

        {/* Status badges */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Badge color="emerald">🖥 {deviceType}</Badge>
          {isBot && <Badge color="rose">🤖 Bot Detected</Badge>}
          {ua.browser.name && (
            <Badge color="sky">🌐 {ua.browser.name} {ua.browser.version}</Badge>
          )}
          {ua.os.name && (
            <Badge color="violet">
              💻 {ua.os.name} {ua.os.version}
            </Badge>
          )}
          {ua.engine.name && (
            <Badge color="amber">⚙️ {ua.engine.name}</Badge>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Browser */}
        <Card title="Browser" icon="🌐" accent="sky">
          <InfoRow label="Name" value={ua.browser.name} />
          <InfoRow label="Version" value={ua.browser.version} />
          <InfoRow label="Is Bot" value={String(ua.isBot)} />
        </Card>

        {/* Device */}
        <Card title="Device" icon="📱" accent="emerald">
          <InfoRow label="Type" value={ua.device.type ?? "desktop"} />
          <InfoRow label="Vendor" value={ua.device.vendor} />
          <InfoRow label="Model" value={ua.device.model} />
        </Card>

        {/* OS */}
        <Card title="Operating System" icon="💻" accent="violet">
          <InfoRow label="Name" value={ua.os.name} />
          <InfoRow label="Version" value={ua.os.version} />
        </Card>

        {/* Engine */}
        <Card title="Rendering Engine" icon="⚙️" accent="amber">
          <InfoRow label="Name" value={ua.engine.name} />
          <InfoRow label="Version" value={ua.engine.version} />
        </Card>

        {/* CPU */}
        <Card title="CPU Architecture" icon="🔲" accent="rose">
          <InfoRow label="Architecture" value={ua.cpu.architecture} />
        </Card>

        {/* Raw User-Agent String */}
        <Card title="Raw User-Agent String" icon="📝" accent="indigo">
          <p className="text-xs font-mono text-slate-300 break-all leading-relaxed">
            {uaString || (
              <span className="text-slate-600 italic">not provided</span>
            )}
          </p>
        </Card>

        {/* Server Info — full width */}
        <div className="md:col-span-2">
          <Card title="Server Info (Node.js os module)" icon="🖥️" accent="rose">
            {/* Warning banner */}
            <div className="mb-4 flex items-start gap-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 px-4 py-3">
              <span className="text-rose-400 text-base shrink-0">⚠️</span>
              <p className="text-xs text-rose-300 leading-relaxed">
                This is the <strong>server&apos;s</strong> username &amp; machine info — the process
                running Next.js on your machine. It is <strong>NOT</strong> the visitor&apos;s
                laptop username. Browsers never expose that for security reasons.
              </p>
            </div>
            <InfoRow label="Username" value={serverInfo.username} />
            <InfoRow label="Hostname" value={serverHostname} />
            <InfoRow label="Platform" value={serverPlatform} />
            <InfoRow label="Architecture" value={serverArch} />
            <InfoRow label="Home Dir" value={serverInfo.homedir} />
          </Card>
        </div>
      </div>

      {/* ── All HTTP Headers ── */}
      <div className="max-w-4xl mx-auto mt-6">
        <Card title={`All Request Headers (${allHeaders.length})`} icon="📋" accent="indigo">
          <div className="divide-y divide-white/5 max-h-[480px] overflow-y-auto pr-1 scrollbar-thin">
            {allHeaders.map(({ name, value }) => (
              <div
                key={name}
                className="flex items-start gap-4 py-2.5 group"
              >
                <span className="text-xs font-mono text-indigo-400 shrink-0 w-52 group-hover:text-indigo-300 transition-colors">
                  {name}
                </span>
                <span className="text-xs font-mono text-slate-300 break-all">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Footer note ── */}
      <p className="text-center text-slate-700 text-xs mt-10">
        Next.js Server Component · <code>headers()</code> is async (v15+) ·{" "}
        <code>userAgent()</code> from <code>next/server</code>
      </p>
    </main>
  );
}
