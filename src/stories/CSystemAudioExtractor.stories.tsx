import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useRef, } from "react";
import { CSystemAudio } from "../lib/CSystemAudio";

const meta = {
  title: "CsystemAudioExtractor",
} satisfies Meta;
export default meta;

type Story = StoryObj;

const PrimaryComponent: React.FC = () => {
  const { current: cSystemAudio } = useRef<CSystemAudio>(new CSystemAudio())
  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return console.error('doesnt exist files');
    const arrayBuffer = await file.arrayBuffer()
    cSystemAudio.setData(arrayBuffer);
    cSystemAudio.parse()
  }, [])
  return (
    <input type='file' onChange={handleChange} />
  )
}

export const Test: Story = {
  render: () => <PrimaryComponent />,
};
