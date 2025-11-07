import { useState } from 'react';
import LevelSwitcher from '../LevelSwitcher';

export default function LevelSwitcherExample() {
  const [level, setLevel] = useState(3);
  
  return (
    <div className="p-4">
      <LevelSwitcher currentLevel={level} onLevelChange={setLevel} />
    </div>
  );
}