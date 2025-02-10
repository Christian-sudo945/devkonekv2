"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const countries = [
  { value: "us", label: "United States", prefix: "+1" },
  { value: "ph", label: "Philippines", prefix: "+63" },
  { value: "gb", label: "United Kingdom", prefix: "+44" },
  { value: "ca", label: "Canada", prefix: "+1" },
  { value: "au", label: "Australia", prefix: "+61" },
  { value: "sg", label: "Singapore", prefix: "+65" },
  { value: "my", label: "Malaysia", prefix: "+60" },
  { value: "jp", label: "Japan", prefix: "+81" },
  { value: "kr", label: "South Korea", prefix: "+82" },
  { value: "cn", label: "China", prefix: "+86" },
  { value: "in", label: "India", prefix: "+91" },
];

interface CountrySelectProps {
  onSelect: (prefix: string) => void;
  value?: string;
  className?: string;
}

export function CountrySelect({ onSelect, value = "+1", className }: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState(
    countries.find(country => country.prefix === value) || countries[0]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[120px] justify-between font-normal", className)}
        >
          {selected.prefix}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {countries.map((country) => (
              <CommandItem
                key={country.value}
                value={country.value}
                onSelect={() => {
                  setSelected(country)
                  onSelect(country.prefix)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.value === country.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {country.label} ({country.prefix})
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
