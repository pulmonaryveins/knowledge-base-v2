// ── FILE: src/app/core/data/pi-player.data.ts ──

import { Team } from '../models/team.model';

export const piPlayerTeam: Team = {
  key: 'pi-player',
  label: 'Pi Player',
  color: '#C2185B',
  gradient: 'linear-gradient(135deg, #1a0010, #4a0020)',
  icon: 'cpu',
  logoUrl: 'https://cdn.simpleicons.org/raspberrypi/C2185B',
  subtitle: 'Raspberry Pi · Embedded Player · Hardware Integration · Display OS',
  stats: [
    { label: 'Devices', value: '0' },
    { label: 'Projects', value: '1' },
    { label: 'In Dev', value: '1' },
    { label: 'Platforms', value: '1' },
  ],
  projects: [],
  sections: [
    {
      id: 'pp-ecosystem',
      label: 'Ecosystem Architecture',
      num: '01',
      subHeader: 'How the core NTV repositories communicate with each other.',
      content: {
        type: 'folder-arch',
        cards: [
          {
            title: 'api-v1 (Central API)',
            body: 'The central brain and database interface for the entire NTV ecosystem. Acts as the middleman — serves data to both the web dashboard and the individual player devices deployed in the field.',
          },
          {
            title: 'dashboard-v1 (Web Dashboard)',
            body: 'The user-facing web application used by administrators and clients to manage content, screens, and settings. Makes HTTP requests to api-v1 to read and write data. Does not communicate directly with the players.',
          },
          {
            title: 'player-server (Local Pi Backend)',
            body: 'The local backend service running on each Raspberry Pi device. Connects upstream to api-v1 (via api.n-compass.online and socket servers) to download schedules, media, and programmatic ads, and report uptime/status. Serves local content and commands downstream to the player-ui.',
          },
          {
            title: 'player-ui / player-ui-v2 (Local Pi Frontend)',
            body: 'The actual visual interface displayed on the TV screens. Runs locally on the Pi and talks exclusively to the player-server to know what to play, when to play it, and to report playback verification. Does not talk directly to api-v1.',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `api-v1 (AWS RDS)
  ↕  ↕
  ↕  socket.io server
  ↕       ↕
dashboard-v1     Raspberry Pi 3/4 | player-v1
(Angular)         ├── player-server  (Node.js v12)
                  │       ↕  socket.io
                  └── player-ui      (Angular 18 · Chromium Kiosk)`,
        },
      },
    },
    {
      id: 'pp-tech-stack',
      label: 'Tech Stack',
      num: '02',
      subHeader: 'Technologies running on each Raspberry Pi player device.',
      content: {
        type: 'tech-stack',
        table: {
          headers: ['Technology', 'Version', 'Purpose', 'Status'],
          rows: [
            { cells: ['Raspberry Pi', '3 / 4', 'ARM-based hardware running each NTV display kiosk', 'Live'] },
            { cells: ['Raspbian OS', 'Legacy "Buster"', 'Base operating system for the Pi player devices', 'Live'] },
            { cells: ['Node.js', 'v12', 'Runtime for the player-server local backend', 'Live'] },
            { cells: ['PM2', '5.x', 'Process manager — runs player-server and player-chromium on boot', 'Live'] },
            { cells: ['NGINX', '1.x', 'Local web server serving the player-ui static files', 'Live'] },
            { cells: ['Angular', '18', 'Framework for the player-ui Chromium kiosk frontend', 'Dev'] },
            { cells: ['Chromium', 'Latest', 'Kiosk browser rendering the player-ui in fullscreen', 'Live'] },
            { cells: ['Socket.IO', '4.x', 'Real-time communication between player-server and api-v1', 'Live'] },
            { cells: ['AnyDesk', '6.1.1', 'Remote management access to deployed Pi devices', 'Live'] },
            { cells: ['MeshCentral', 'Latest', 'Remote monitoring and management agent on each Pi', 'Live'] },
          ],
        },
      },
    },
    {
      id: 'pp-device-setup',
      label: 'Device Setup Guide',
      num: '03',
      subHeader: 'Step-by-step process for setting up a fresh Raspberry Pi as an NTV Player device.',
      content: {
        type: 'getting-started',
        steps: [
          {
            icon: 'monitor',
            title: 'Install & Configure XScreensaver',
            description: 'Prevent the Pi from sleeping or showing a screensaver. Install xscreensaver, navigate to Start > Preferences > Screensaver, and set Mode to Disable Screen Saver.',
            code: 'sudo apt install xscreensaver -y',
            language: 'bash',
          },
          {
            icon: 'remote-control',
            title: 'Install AnyDesk (v6.1.1)',
            description: 'Install the specific AnyDesk version used for remote management of deployed Pi devices.',
            code: 'sudo apt install libminizip1\nwget https://download.anydesk.com/rpi/anydesk_6.1.1-1_armhf.deb\nsudo dpkg -i anydesk_6.1.1-1_armhf.deb',
            language: 'bash',
          },
          {
            icon: 'download',
            title: 'Run the NCTV Installer Script',
            description: 'Download and run the installer script. This installs all required dependencies: Node, NGINX, PM2, Chromium, GNome Terminal, SCROT, Unclutter, CEC Utils, player-server, and player-ui.',
            code: 'curl -O https://ncompasstv-prod-player-apps.s3.amazonaws.com/nctv-installer/04142023/nctv-installer.zip\nunzip nctv-installer.zip\nsh nctv-installer/installer.sh',
            language: 'bash',
          },
          {
            icon: 'play',
            title: 'Configure PM2 Startup',
            description: 'Set the player to run automatically on boot. Run the PM2 starter script — when the player asks for a license key, do NOT enter it yet. Reboot to verify startup.',
            code: 'sh nctv-installer/pm2-starter.sh\n# Do not enter license key yet\nsudo reboot',
            language: 'bash',
          },
          {
            icon: 'shield',
            title: 'Configure Watchdog Service',
            description: 'The watchdog service will automatically reboot the Pi if the system hangs. Run the watchdog starter script, then test it with the crash simulator — the Pi should reboot automatically.',
            code: 'sudo sh nctv-installer/watchdog-starter.sh\n# Test: sudo bash -c \':(){ :|:& };:\'',
            language: 'bash',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Verification checklist after setup
nginx -v                      # NGINX installed
node -v                       # Node.js installed
npm -v                        # NPM installed
sudo n 12                     # Node version manager
pm2 status                    # player-server + player-chromium running
chromium-browser --version    # Chromium installed
scrot --version               # SCROT installed
echo 'scan' | cec-client -s -d 1  # CEC utils

# Verify player files
ls ~/n-compasstv/player-server     # node_modules, src, package.json, .env
ls /var/www/html/ui                # player-ui files present`,
        },
      },
    },
    {
      id: 'pp-imaging',
      label: 'Player Imaging Guide',
      num: '04',
      subHeader: 'How to create and deploy standardized SD card images for Pi player devices.',
      content: {
        type: 'getting-started',
        steps: [
          {
            icon: 'cpu',
            title: 'Step 1 — Prep the Source Pi',
            description: 'Run the prep script on the source Pi to remove all machine-specific identifiers (SSH host keys, MeshCentral DB, logs, WiFi configs, machine-id). WARNING: Only run on the source Pi — never on your local machine.',
            code: 'cd /path/to/player-scripts\nsudo ./ntv-rpi-prep.sh\n# Press y to continue\n# Once "Prep complete!" is shown:\nsudo shutdown -h now',
            language: 'bash',
          },
          {
            icon: 'hard-drive',
            title: 'Step 2 — Create the Image (Linux PC)',
            description: 'Insert the prepped SD card into a Linux PC. Identify the block device, then run the imager script. The -a flag enables parallel multi-core compression for faster output. Target the whole block device (e.g. /dev/sda), NOT a specific partition.',
            code: 'lsblk\n# Identify SD card device (e.g. /dev/sda)\ncd /path/to/player-scripts\nsudo ./ntv-rpi-imager.sh -a /dev/sda',
            language: 'bash',
          },
          {
            icon: 'zap',
            title: 'Step 3 — Flash and Deploy',
            description: 'Open Raspberry Pi Imager on any computer. Select Choose OS → Use Custom and select the generated .img.xz file. Select storage (target SD card) and click Write. On first boot, the Pi will auto-expand its filesystem and reboot once.',
            code: '# Output file example:\n# ntv-2.9.43-3.0.48.img.xz\n\n# To re-enable SSH on a cloned Pi (if needed):\nsudo systemctl enable ssh && sudo systemctl start ssh',
            language: 'bash',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Imager script options
sudo ./ntv-rpi-imager.sh /dev/sda           # Default (single-core, interactive)
sudo ./ntv-rpi-imager.sh -a /dev/sda        # Fast mode (all CPU cores)
sudo ./ntv-rpi-imager.sh -y /dev/sda        # Non-interactive (skip prompts)
sudo ./ntv-rpi-imager.sh /dev/sda ./my-custom-image.img.xz  # Custom output`,
        },
      },
    },
    {
      id: 'pp-issue-protocol',
      label: 'Player Issue Protocol',
      num: '05',
      subHeader: 'Troubleshooting guide for the Technical Support team when addressing player issues in production.',
      content: {
        type: 'getting-started',
        steps: [
          {
            icon: 'clipboard-list',
            title: 'Check Versions',
            description: 'Note down the Player Server and Player UI versions from the dashboard before doing anything else.',
          },
          {
            icon: 'square',
            title: 'Stop the Player',
            description: 'Log in via AnyDesk to access the Player. If the player is running, stop it by pressing CTRL + SHIFT + K on the keyboard.',
          },
          {
            icon: 'terminal',
            title: 'Obtain PM2 Logs',
            description: 'Open a terminal on the Pi. Check PM2 entries — there should be two: player-chromium and player-server. View server logs and look for errors (red text). Take a screenshot of any errors.',
            code: 'pm2 status\npm2 logs player-server --lines 5000\n# Search for errors: CTRL + SHIFT + F',
            language: 'bash',
          },
          {
            icon: 'download',
            title: 'Download PM2 Logs via AnyDesk',
            description: 'Click Browse Files in AnyDesk. Navigate to /home/pi/.pm2/logs on the remote device. Right-click player-server-out.log and select Download. Save for further analysis.',
            code: '/home/pi/.pm2/logs',
            language: 'bash',
          },
          {
            icon: 'send',
            title: 'Resolve or Escalate',
            description: 'Proceed with rebooting or running the designated script to resolve the issue. If unresolved, escalate to the devs with all collected logs and screenshots via email, Skype, or Zoom.',
          },
        ],
        codeBlock: {
          language: 'bash',
          code: `# Dev Contacts
# Earl Vhin Gabuat   — earlg@n-compass.biz   | Zoom PMI: 724 768 7393
# Mikoo Saguindang   — mikoos@n-compass.biz  | Zoom PMI: 739 516 4672`,
        },
      },
    },
    {
      id: 'pp-contacts',
      label: 'Team Contacts',
      num: '06',
      content: {
        type: 'team-contacts',
        contacts: [
          {
            name: 'Mikoo Saguindang',
            role: 'Team Lead',
            initials: 'MS',
            color: '#C2185B',
          },
          {
            name: 'Earl Vhin Gabuat',
            role: 'Lead Engineer',
            initials: 'EV',
            color: '#6366F1',
          },
        ],
      },
    },
  ],
};
