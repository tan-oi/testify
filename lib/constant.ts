import { Inbox, MessageSquare, Video, Heart } from 'lucide-react';
import { SidebarElementInterface } from './types';
export const sidebarData = [
  {
    Inbox: [
      {
        name: 'All',
        viewName: 'all',
        icon: "Inbox"
      },
      {
        name: 'Text',
        viewName: 'texts',
        icon: "MessageSquare"
      },
      {
        name: 'Video',
        viewName: 'videos',
        icon: "Video"
      },
      {
        name: 'Liked',
        viewName: 'liked',
        icon: "Heart"
      }
    ]
  }
];
