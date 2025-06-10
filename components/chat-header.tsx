'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { PlusIcon, GitIcon } from './icons';
import { useSidebar } from './ui/sidebar';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { type VisibilityType } from './visibility-selector';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import type { Session } from 'next-auth';
import { useTheme } from 'next-themes';
import { Menu, Check } from 'lucide-react';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { ModelSelector } from '@/components/model-selector';
import { VisibilitySelector } from '@/components/visibility-selector';

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  session,
}: {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();
  // const { setTheme, theme } = useTheme();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-[20px] md:px-[20px] gap-2 justify-between">
      {/* Right-aligned items (moved to the left) */}
      <div className="flex items-center gap-2">
        {!isReadonly && (
          <VisibilitySelector
            chatId={chatId}
            selectedVisibilityType={selectedVisibilityType}
            className="order-1 md:order-3"
          />
        )}
        <span className="text-l text-muted-foreground font-large">PWR Chain</span>
        <span className="text-xs text-muted-foreground font-small sm:mr-2">(Beta)</span>
         
        <SidebarToggle />
      </div>

      {/* Left-aligned items (moved to the right) */}
      <div className="flex items-center gap-2">
        {(!open || windowWidth < 768) && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className=" md:px-2 px-2 md:h-fit ml-auto md:ml-0"
                onClick={() => {
                  router.push('/');
                  router.refresh();
                }}
              >
                <PlusIcon />
                <span className="sr-only">New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="p-2"
              onClick={() => window.open("https://pwrchain.io", '_blank')}
            >
              <Image
                src="/favicon.ico"
                alt="PWR Chain Logo"
                className="h-6 w-auto"
                width={24}
                height={24}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Contact PWR Chain</TooltipContent>
        </Tooltip>
        {/* GitHub button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="p-2"
              onClick={() => window.open('https://github.com/pwrlabs', '_blank')}
              aria-label="GitHub Repository"
            >
              <GitIcon/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>GitHub Repository</TooltipContent>
        </Tooltip>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="p-2"
              aria-label="Help / Documentation"
            >
              <Menu size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onSelect={() => window.open('https://github.com/pwrlabs/', '_blank')}>
              How To Guide
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => setTheme('dark')}>
                  Dark
                  {theme === 'dark' && <Check className="ml-auto size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTheme('light')}>
                  Light
                  {theme === 'light' && <Check className="ml-auto size-4" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
