import {
  Box,
  Button,
  ButtonIcon,
  Menu,
  MenuItem,
  Icon,
  Text,
  Select,
  SelectTrigger,
  SelectContent,
  SelectIcon,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
} from "@gluestack-ui/themed";
import {
  Twitter,
  EllipsisVertical,
  ArrowUpRight,
  SquarePen,
  ChevronDownIcon,
} from "lucide-react-native";
import { Link } from "expo-router";
import { useContext } from "react";
import { storeContext } from "../context/storeContext";

export default function HeaderMenu() {
  const { category, setCategory } = useContext(storeContext);

  return (
    <Menu
      placement="top"
      trigger={({ ...triggerProps }) => {
        return (
          <Button pl={8} {...triggerProps} variant="link">
            <ButtonIcon as={EllipsisVertical} size="xl" color="black" />
          </Button>
        );
      }}
    >
      <MenuItem key="Twitter" textValue="Twitter" pb={0}>
        <Link href="https://twitter.com/sarkartanmay393" asChild>
          <Button
            variant="outline"
            action="secondary"
            flex={1}
            display="flex"
            alignItems="center"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={6}>
              <Icon as={Twitter} size="sm" />
              <Text size="md" fontWeight="500">
                Twitter
              </Text>
            </Box>
            <Icon as={ArrowUpRight} size="xs" />
          </Button>
        </Link>
      </MenuItem>
      <MenuItem key="Category" textValue="Category" pb={0}>
        <Box flex={1} display="flex" alignItems="center" flexDirection="row">
          <Select
            flex={1}
            selectedValue={category}
            onValueChange={(t) => setCategory(t)}
          >
            <SelectTrigger variant="outline" size="md" borderColor="green">
              <SelectIcon ml="$3">
                <Icon as={SquarePen} size="sm" />
              </SelectIcon>
              <SelectInput placeholder=" Change Category" value={category} />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Date" value="Date" />
                <SelectItem label="Math" value="Math" />
                <SelectItem label="Random" value="Random" />
                <SelectItem label="Trivia" value="Trivia" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </Box>
      </MenuItem>
    </Menu>
  );
}
