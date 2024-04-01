import { MotionDiv } from '@/libs/framer';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      {children}
    </MotionDiv>
  );
}
