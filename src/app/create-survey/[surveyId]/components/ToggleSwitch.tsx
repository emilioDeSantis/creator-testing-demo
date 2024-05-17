const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <label className="toggle-switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider"></span>
    </label>
);

export default ToggleSwitch;
