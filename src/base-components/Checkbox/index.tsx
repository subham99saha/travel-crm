import { Switch } from "@headlessui/react";
import { Check } from "lucide-react";

function Checkbox({
  label,
  name,
  checked,
  onChange,
  disabled,
}: {
  label?: string;
  name?: string;
  checked?: boolean;
  onChange?: any;
  disabled?: boolean;
}) {
  return (
    <Switch.Group>
      <div className="flex items-center justify-between">
        <Switch
          checked={checked}
          onChange={onChange}
          name={name}
          disabled={disabled}
          className={`
          relative flex h-4 w-4 items-center justify-center rounded-lg transition-all duration-200 outline-none ring-1 
          ${!checked && !disabled ? "ring-gray-400" : ""}
          ${checked && !disabled ? "ring-blue-400" : ""} 
          ${disabled ? "bg-gray-200 ring-gray-200" : "bg-white"}  
          `}
        >
          <Check
            size="1rem"
            className={`
            ${checked ? "scale-100" : "scale-0"} 
            ${checked && !disabled ? "text-blue-400" : "text-gray-400"} 
            transition-transform duration-200 ease-out`}
          />
        </Switch>
        {label && <Switch.Label className="ml-2">{label}</Switch.Label>}
      </div>
    </Switch.Group>
  );
}
export default Checkbox;
