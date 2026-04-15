// ─── Scan List ─────────────────────────────────────────────

export interface Scan {
  id: string;
  domain: string;
  date: string;
}

export const mockScans: Scan[] = [
  { id: "scan-001", domain: "acme-corp.com", date: "Apr 02 2025 @ 2:30 PM" },
  { id: "scan-002", domain: "acme-corp.com", date: "Mar 19 2025 @ 10:14 AM" },
  { id: "scan-003", domain: "acme-corp.com", date: "Mar 05 2025 @ 9:00 AM" },
  { id: "scan-004", domain: "acme-corp.com", date: "Feb 18 2025 @ 4:45 PM" },
  { id: "scan-005", domain: "acme-corp.com", date: "Feb 01 2025 @ 11:20 AM" },
];

// ─── Page Header ───────────────────────────────────────────

export const scansPageHeader = {
  title: "My Scans",
};
