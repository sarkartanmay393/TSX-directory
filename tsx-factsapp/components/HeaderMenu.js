import {
  Box,
  Button,
  ButtonIcon,
  Menu,
  MenuItem,
  Icon,
  Text,
} from "@gluestack-ui/themed";
import {
  Twitter,
  EllipsisVertical,
  ArrowUpRight,
  SquarePen,
} from "lucide-react-native";
import { Link } from "expo-router";

export default function HeaderMenu() {
  return (
    <Menu
      placement="top"
      trigger={({ ...triggerProps }) => {
        return (
          <Button {...triggerProps} variant="link">
            <ButtonIcon as={EllipsisVertical} size="xl" color="black" />
          </Button>
        );
      }}
    >
      <MenuItem key="Twitter" textValue="Twitter">
        <Link href={"https://twitter.com/sarkartanmay393"} asChild>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
            gap={6}
          >
            <Icon as={Twitter} size="sm" />
            <Text size="md" fontWeight="500">
              Twitter
            </Text>
            <Icon as={ArrowUpRight} size="xs" />
          </Box>
        </Link>
      </MenuItem>
      <MenuItem key="Category" textValue="Category">
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          gap={6}
        >
          <Icon as={SquarePen} size="sm" />
          <Text size="md" fontWeight="500">
            Change Category
          </Text>
        </Box>
      </MenuItem>
    </Menu>
  );
}
