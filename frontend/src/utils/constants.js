import { Cloud, ShoppingCart, Smartphone, Code, Layers, Zap, ClipboardList, Users, Package, Briefcase, DollarSign, Phone, TrendingUp } from 'lucide-react'

export const SERVICES = [
  {
    id: 'saas',
    title: 'SaaS Development',
    description: 'Build scalable cloud-based solutions for your business needs.',
    icon: Cloud,
    path: '/services/saas-development',
    features: ['Cloud Architecture', 'Multi-tenant Systems', 'API Development', 'Auto-scaling']
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    description: 'Custom online stores with seamless payment integration.',
    icon: ShoppingCart,
    path: '/services/ecommerce-solutions',
    features: ['Shopping Cart', 'Payment Gateway', 'Inventory Management', 'Analytics']
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Native iOS and Android applications.',
    icon: Smartphone,
    path: '/services/mobile-app-development',
    features: ['iOS Development', 'Android Development', 'Cross-platform', 'App Store Deployment']
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Responsive websites built with modern technologies.',
    icon: Code,
    path: '/services/web-development',
    features: ['Responsive Design', 'Modern Frameworks', 'SEO Optimization', 'Performance']
  },
  {
    id: 'api',
    title: 'API Integration',
    description: 'Connect your systems with powerful API solutions.',
    icon: Layers,
    path: '/services/api-integration',
    features: ['RESTful APIs', 'GraphQL', 'Third-party Integration', 'Documentation']
  },
  {
    id: 'cloud',
    title: 'Cloud Services',
    description: 'Deploy and scale with AWS, Azure, and Google Cloud.',
    icon: Zap,
    path: '/services/cloud-services',
    features: ['AWS', 'Azure', 'Google Cloud', 'DevOps']
  }
]

export const TOOLS = [
  {
    id: 'zavyo',
    name: 'Zavyo',
    description: 'Whatsaap marketing tool',
    icon: Zap,
    path: 'https://zavyo.io/',
    external: true,
    benefits: ['Website Access', 'External Platform', 'Product Overview']
  },
  {
    id: 'task-tracker',
    name: 'Task Tracker',
    description: 'Manage tasks and projects efficiently',
    icon: ClipboardList,
    path: 'https://tracker.niveshsarthi.com/',
    external: true,
    benefits: ['Real-time Updates', 'Team Collaboration', 'Progress Tracking']
  },
  {
    id: 'lead-management',
    name: 'Lead Management System',
    description: 'Track and convert leads effectively',
    icon: Users,
    path: '/tools/lead-management',
    benefits: ['Lead Scoring', 'Pipeline Management', 'Automated Follow-ups']
  },
  {
    id: 'inventory',
    name: 'Inventory Management System',
    description: 'Track stock levels and orders',
    icon: Package,
    path: '/tools/inventory-management',
    benefits: ['Stock Tracking', 'Order Management', 'Reporting']
  },
  {
    id: 'hrms',
    name: 'HRMS',
    description: 'Complete HR management solution',
    icon: Briefcase,
    path: 'https://hrms.niveshsarthi.com/',
    external: true,
    benefits: ['Employee Database', 'Payroll', 'Leave Management']
  },
  {
    id: 'account-management',
    name: 'Account Management System',
    description: 'Manage finances and accounts',
    icon: DollarSign,
    path: '/tools/account-management',
    benefits: ['Financial Tracking', 'Invoicing', 'Reports']
  },
  {
    id: 'ivr',
    name: 'IVR Software',
    description: 'Interactive voice response system',
    icon: Phone,
    path: '/tools/ivr-software',
    benefits: ['Call Routing', 'Voice Menu', '24/7 Support']
  },
  {
    id: 'trading',
    name: 'Trading Software',
    description: 'Advanced trading platform',
    icon: TrendingUp,
    path: '/tools/trading-software',
    benefits: ['Real-time Data', 'Analytics', 'Automated Trading']
  }
]

export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '₹999',
    period: 'per project',
    features: [
      'Basic Web Development',
      'Responsive Design',
      '3 Pages',
      'Basic SEO',
      'Email Support',
      '30 Days Support'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '₹2,499',
    period: 'per project',
    features: [
      'Advanced Web/Mobile App',
      'Custom Design',
      'Up to 10 Pages',
      'Advanced SEO',
      'API Integration',
      'Priority Support',
      '90 Days Support'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '₹5,999',
    period: 'per project',
    features: [
      'Full Stack Development',
      'Unlimited Pages',
      'Custom CMS',
      'Cloud Deployment',
      'Database Design',
      '24/7 Support',
      '1 Year Support',
      'Dedicated Team'
    ],
    popular: false
  }
]
