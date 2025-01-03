import { useFormContext } from "../../../../context/FormContext";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

export const Floors = () => {
  const { selectedFormValues, setSelectedFormValues } = useFormContext();

  const handleChange = (roomLabel: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSelectedFormValues((prevValues) => {
      const updatedRooms = prevValues.rooms.map((room) => {
        if (room.label === roomLabel) {
          const updatedFloors = room.floors.map((floor) => ({
            ...floor,
            isSelected: floor.label === value,
          }));
          return { ...room, floors: updatedFloors };
        }
        return room;
      });
      return { ...prevValues, rooms: updatedRooms };
    });
  };

  return (
    <Box>
      <Typography variant="h6">Which floor do you like to decorate?</Typography>
      {selectedFormValues.rooms
        .filter((room) => room.isSelected)
        .map((room) => (
          <FormControl key={room.id}>
            <FormLabel>{room.label}</FormLabel>
            <RadioGroup
              value={room.floors.find((f) => f.isSelected)?.label || ""}
              onChange={handleChange(room.label)}
            >
              {room.floors.map((floor) => (
                <FormControlLabel
                  key={floor.id}
                  value={floor.label}
                  control={<Radio />}
                  label={floor.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
    </Box>
  );
};
