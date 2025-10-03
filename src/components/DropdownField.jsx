import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

/**
 * A reusable component for a styled form dropdown/select field.
 *
 * @param {object} props
 * @param {string} props.icon - The image source for the icon.
 * @param {string} props.label - The placeholder/label text.
 * @param {string} props.formKey - The key in the main form state (e.g., 'genre', 'pays').
 * @param {string} props.dropdownKey - The key in the dropdownStates (e.g., 'gender', 'country').
 * @param {Array<string>} props.options - The array of available options.
 * @param {string} props.selectedValue - The current value from the parent form state.
 * @param {function} props.onSelect - Function to update the parent form state.
 * @param {object} props.dropdownStates - Object containing all dropdown open/close states.
 * @param {function} props.setDropdownStates - Function to update all dropdown states.
 */
const DropdownField = ({
  icon,
  label,
  formKey,
  dropdownKey,
  options,
  selectedValue,
  onSelect,
  dropdownStates,
  setDropdownStates,
}) => {
  const isOpen = dropdownStates[dropdownKey];

  const toggleDropdown = () => {
    // Close all others and open the current one
    setDropdownStates(prevState => ({
      gender: false,
      country: false,
      status: false,
      niveau: false,
      [dropdownKey]: !prevState[dropdownKey]
    }));
  };

  const selectOption = (option) => {
    onSelect(formKey, option);
    setDropdownStates(prevState => ({ ...prevState, [dropdownKey]: false }));
  };

  return (
    <div
      className="border-b-2 flex items-center relative cursor-pointer"
      onClick={toggleDropdown}
    >
      <img src={icon} alt="" />
      <span
        className={`${
          selectedValue === "" ? "text-zinc-500" : "text-zinc-900"
        } p-2`}
      >
        {selectedValue || label}
      </span>
      <div className="flex justify-center items-center size-7 border-2 border-zinc-500 rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer">
        <FontAwesomeIcon
          icon={faChevronDown}
          className="text-zinc-500"
        />
      </div>
      {isOpen && (
        <div className="absolute bg-white w-full top-[105%] border divide-y divide-zinc-200 max-h-25 overflow-auto z-1000 shadow-lg rounded-sm">
          {options.map((option) => (
            <div
              key={option}
              className="p-2 hover:bg-zinc-200 cursor-pointer text-zinc-900"
              onClick={(e) => {
                  e.stopPropagation(); 
                  selectOption(option);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownField;