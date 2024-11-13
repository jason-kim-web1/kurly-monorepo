interface SubTabEventProperties {
  type: 'recommendation' | 'category' | 'collection' | 'banner' | 'webview';
  id: string;
  position: number;
  name: string;
  selection_type: 'click' | 'swipe';
}

export type { SubTabEventProperties };
