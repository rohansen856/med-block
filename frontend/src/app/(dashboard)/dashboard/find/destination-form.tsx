import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RainbowButton } from "@/components/magicui/rainbow-button"

export function DestinationForm() {
  return (
    <form className="mx-auto size-full space-y-8 rounded-3xl bg-secondary p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={"peoples"}>Maximum budget</Label>
          <Input
            type="number"
            id={`peoples`}
            placeholder={`Enter number of persons`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={"peoples"}>Minimum budget</Label>
          <Input
            type="number"
            id={`peoples`}
            placeholder={`Enter number of days`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={"peoples"}>Number of peoples</Label>
          <Input
            type="number"
            id={`peoples`}
            placeholder={`Enter number of persons`}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={"peoples"}>Duration</Label>
          <Input
            type="number"
            id={`peoples`}
            placeholder={`Enter number of persons`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="select-field">Destination type</Label>
          <Select>
            <SelectTrigger id="select-field">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Desert</SelectItem>
              <SelectItem value="option2">Beack</SelectItem>
              <SelectItem value="option3">Mountains</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="text-field">Description</Label>
          <Input
            type="text"
            id="text-field"
            placeholder="Enter additional informations"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <RainbowButton
          type="submit"
          className="mx-auto w-full max-w-xl rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Submit
        </RainbowButton>
      </div>
    </form>
  )
}
