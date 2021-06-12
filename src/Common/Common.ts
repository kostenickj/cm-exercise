

import { Theme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Router } from 'next/router';
import { IAppTheme } from './Theme';

export type CssPropsRecursive = { [key: string]: React.CSSProperties | CssPropsRecursive };

export class FClientUtil
{

    private static BPOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

    static IsClientSide()
    {
        return typeof window !== 'undefined';
    }

    static BreakpointSmallerThan(Compare: Breakpoint, ToMe: Breakpoint): boolean
    {
        return FClientUtil.BPOrder.indexOf(Compare) < FClientUtil.BPOrder.indexOf(ToMe);
    }

    static BreakpointLargerThan(Compare: Breakpoint, ToMe: Breakpoint): boolean
    {
        return FClientUtil.BPOrder.indexOf(Compare) > FClientUtil.BPOrder.indexOf(ToMe);
    }

    static GetCurrentBreakpoint(InTheme: Theme): Breakpoint
    {

        if (typeof window !== 'undefined')
        {
            const Width = window.innerWidth;
            if (Width < InTheme.breakpoints.values.sm)
            {
                return 'xs';
            }
            else if (Width < InTheme.breakpoints.values.md)
            {
                return 'sm';
            }
            else if (Width < InTheme.breakpoints.values.lg)
            {
                return 'lg';
            }
            else
            {
                return 'xl';
            }
        }
        return 'lg';
    }

    static Check(Condition: boolean, Message: string = 'maybe dont do that'): void
    {
        if (!Condition)
        {
            throw new Error(Message);
        }
    }

    static ReplaceAll(TheString: string, ReplaceThis: string, WithThis: string, IgnoreCase: boolean = true)
    {
        return TheString.replace(new RegExp(ReplaceThis.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'), (IgnoreCase ? 'gi' : 'g')), (typeof (WithThis) == 'string') ? WithThis.replace(/\$/g, '$$$$') : WithThis);
    }

}


export interface IBaseComponentProps {
    theme?: IAppTheme;
    router?: Router;
    classes?: { [key: string]: string };
}