export type IntegrationSeedItem = {
  category: string;
  protocols: string[];
  shortDescription: string;
  slug: string;
  status: 'available' | 'beta' | 'planned';
  title: string;
  vendor?: string;
};

export const integrationSeedItems: IntegrationSeedItem[] = [
  {
    title: 'LDAP',
    slug: 'ldap',
    status: 'available',
    category: 'Identity & Access',
    protocols: ['LDAP'],
    shortDescription: 'Synchronisiert Benutzer und Gruppen aus zentralen Verzeichnisdiensten.',
  },
  {
    title: 'OIDC',
    slug: 'oidc',
    status: 'available',
    category: 'Identity & Access',
    protocols: ['OIDC'],
    shortDescription: 'Single Sign-on und sichere Token-Flows für Web- und Admin-Zugriffe.',
  },
  {
    title: 'MCP',
    slug: 'mcp',
    status: 'beta',
    category: 'AI & Agentic Systems',
    protocols: ['MCP', 'REST'],
    shortDescription: 'Anbindung von AI-Agenten für kontrollierte Tool-Aufrufe und Workflows.',
  },
  {
    title: 'IP500',
    slug: 'ip500',
    status: 'planned',
    category: 'Building & Industrial',
    protocols: ['IP500'],
    shortDescription: 'Bringt klassische Gebäude- und Feldbus-Kommunikation in die Plattform.',
  },
  {
    title: 'n8n',
    slug: 'n8n',
    status: 'available',
    category: 'Automation Platforms',
    protocols: ['Webhook', 'REST'],
    shortDescription: 'Low-code Automations für Benachrichtigungen, Provisioning und Reports.',
    vendor: 'n8n',
  },
  {
    title: 'Node-RED',
    slug: 'node-red',
    status: 'available',
    category: 'Automation Platforms',
    protocols: ['MQTT', 'Webhook', 'REST'],
    shortDescription: 'Visuelle Flows für OT/IoT Integrationen und Event-getriebene Prozesse.',
    vendor: 'Node-RED',
  },
  {
    title: 'ModBus',
    slug: 'modbus',
    status: 'beta',
    category: 'Building & Industrial',
    protocols: ['ModBus'],
    shortDescription: 'Anbindung industrieller Steuerungen und Sensorik über ModBus RTU/TCP.',
  },
  {
    title: 'MQTT',
    slug: 'mqtt',
    status: 'available',
    category: 'IoT Messaging',
    protocols: ['MQTT'],
    shortDescription: 'Echtzeit-Eventing für Geräte, Telemetrie und Zustandsänderungen.',
  },
  {
    title: 'Stripe',
    slug: 'stripe',
    status: 'planned',
    category: 'Finance & Billing',
    protocols: ['REST', 'Webhook'],
    shortDescription: 'Abrechnung, Subscription-Events und Zahlungsstatus in Prozessen nutzen.',
    vendor: 'Stripe',
  },
  {
    title: 'EasyVerein',
    slug: 'easyverein',
    status: 'planned',
    category: 'Membership Management',
    protocols: ['REST'],
    shortDescription: 'Mitglieder- und Beitragsdaten für Berechtigungen und Prozesse synchronisieren.',
    vendor: 'EasyVerein',
  },
];
