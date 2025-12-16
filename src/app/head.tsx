import { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: { url: '/api/favicon', type: 'image/x-icon' },
    shortcut: { url: '/api/favicon', type: 'image/x-icon' },
    apple: { url: '/api/favicon', type: 'image/x-icon' },
  },
  other: {
    'cache-control': 'no-cache, no-store, must-revalidate',
    pragma: 'no-cache',
    expires: '0'
  }
};

// This file is intentionally left empty as we're using the Metadata API
export default function Head() {
  return null;
}
