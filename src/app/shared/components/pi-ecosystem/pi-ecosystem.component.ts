// ── FILE: src/app/shared/components/pi-ecosystem/pi-ecosystem.component.ts ──

import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Server, Database, Network, LayoutDashboard, Monitor, Cpu,
  LucideIconData,
} from 'lucide-angular';

/**
 * Renders a static visual diagram of the NTV Pi Player ecosystem.
 *
 * Topology:
 *  - api-v1 (left) ↔ RDS (right) — HTTP/SQL
 *  - api-v1 ↔ socket.io server — WebSocket relay hub
 *  - socket.io server → dashboard-v1 (web client)
 *  - socket.io server → Raspberry Pi (player-server ↔ player-ui)
 *
 * Pure presentational component — no inputs, no service injection.
 * All connecting lines are rendered via CSS (dashed gradients + grid alignment).
 */
@Component({
  selector: 'app-pi-ecosystem',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './pi-ecosystem.component.html',
  styleUrl: './pi-ecosystem.component.scss',
})
export class PiEcosystemComponent {
  /** Lucide icon for api-v1 and player-server nodes (server/backend services). */
  protected readonly iconServer: LucideIconData = Server;

  /** Lucide icon for the RDS database node. */
  protected readonly iconDb: LucideIconData = Database;

  /** Lucide icon for the socket.io server hub node. */
  protected readonly iconHub: LucideIconData = Network;

  /** Lucide icon for the dashboard-v1 web client node. */
  protected readonly iconDash: LucideIconData = LayoutDashboard;

  /** Lucide icon for the player-ui Chromium kiosk node. */
  protected readonly iconUi: LucideIconData = Monitor;

  /** Lucide icon for the Raspberry Pi hardware boundary label. */
  protected readonly iconCpu: LucideIconData = Cpu;
}
