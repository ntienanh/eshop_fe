import {
  Box,
  Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import React from "react";
import classes from "./style.module.css";
import { IconChevronRight } from "@tabler/icons-react";
import {
  useParams,
  usePathname,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import { useNProgress, useNProgressRouter } from "@/hooks/useNProgress";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

const LinksGroup = (props: LinksGroupProps) => {
  const { icon: Icon, label, initiallyOpened, links } = props || {};
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = React.useState(initiallyOpened || false);
  useNProgress();
  const router = useNProgressRouter();
  const segment = useSelectedLayoutSegment();
  const params = useParams();
  const path = usePathname();

  const items = (hasLinks ? links : []).map((link) => {
    return (
      <Text<"a">
        data-active={segment === "admin"}
        component="a"
        className={classes.link}
        href={link.link}
        key={link.label}
        onClick={(event) => {
          event.preventDefault();
          router.push(`/admin/${link?.link}`);
        }}
      >
        {link.label}
      </Text>
    );
  });

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
        data-active={segment === "admin"}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon
              data-active={segment === "admin"}
              variant="light"
              size={30}
            >
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
};

export default LinksGroup;
