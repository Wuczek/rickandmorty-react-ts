import { Select } from 'semantic-ui-react'

const filterOptions = [
  { key: 'all', value: '', text: 'All' },
  { key: 'alive', value: 'alive', text: 'Alive' },
  { key: 'dead', value: 'dead', text: 'Dead' },
  { key: 'unknown', value: 'unknown', text: 'Unknown' },
]

const SelectFilterStatus = ({ onChange, value }: { onChange: (value: string) => void; value: string }) => (
    <Select
      placeholder="Filter characters by status"
      options={filterOptions}
      onChange={(_, data) => onChange(data.value as string)}
      value={value}
    />
  );

export default SelectFilterStatus