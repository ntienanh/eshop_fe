import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { nprogress } from '@mantine/nprogress';
import React from 'react';

export const useNProgress = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    nprogress.complete();
  }, [pathname, searchParams]);
};

export const useNProgressRouter = () => {
  const router = useRouter();

  const { push, replace, back } = router;

  router.push = (href, options) => {
    nprogress.start();
    push(href, options);
  };

  router.back = () => {
    nprogress.start();
    back();
  };

  router.replace = (href, options) => {
    nprogress.start();
    replace(href, options);
  };

  return router;
};
