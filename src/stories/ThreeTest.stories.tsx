import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, } from "react";

const meta = {
  title: "CsystemAudioExtractor",
} satisfies Meta;
export default meta;

type Story = StoryObj;

const PrimaryComponent: React.FC = () => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) console.error('doesnt exist files');

  }, [])
  return (
    <input type='file' onChange={handleChange} />
  )
}

export const Test: Story = {
  render: () => <PrimaryComponent />,
};
