import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export const RoomSizes = () => {
  const { selectedFormValues, setSelectedFormValues } = useFormContext();

  const handleChange = (roomLabel: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.label === roomLabel) {
          const updatedRoomSizes = room.roomSizes.map((roomSize) => ({
            ...roomSize,
            isSelected: roomSize.label === value,
          }));
          return { ...room, roomSizes: updatedRoomSizes };
        }
        return room;
      });
      return { ...prevValues, rooms: updatedRooms };
    });
  };

  return (
    <Box>
      <Typography variant="h6">What is the average m² for each selected room?</Typography>
      {selectedFormValues.rooms
        .filter((room) => room.isSelected)
        .map((room) => (
          <FormControl key={room.id}>
            <FormLabel>{room.label}</FormLabel>
            <RadioGroup
              value={room.roomSizes.find((f) => f.isSelected)?.label || ""}
              onChange={handleChange(room.label)}
            >
              {room.roomSizes.map((roomSize) => (
                <FormControlLabel
                  key={roomSize.id}
                  value={roomSize.label}
                  control={<Radio />}
                  label={roomSize.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
    </Box>
  );
};
