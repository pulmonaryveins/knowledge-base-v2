// ── FILE: src/app/shared/components/pi-ecosystem/pi-ecosystem.component.ts ──

import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Server, Database, Network, LayoutDashboard, Monitor, Cpu,
  LucideIconData,
} from 'lucide-angular';

@Component({
  selector: 'app-pi-ecosystem',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './pi-ecosystem.component.html',
  styleUrl: './pi-ecosystem.component.scss',
})
export class PiEcosystemComponent {
  protected readonly iconServer: LucideIconData = Server;
  protected readonly iconDb: LucideIconData = Database;
  protected readonly iconHub: LucideIconData = Network;
  protected readonly iconDash: LucideIconData = LayoutDashboard;
  protected readonly iconUi: LucideIconData = Monitor;
  protected readonly iconCpu: LucideIconData = Cpu;
}
