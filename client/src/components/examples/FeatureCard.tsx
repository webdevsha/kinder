import FeatureCard from '../FeatureCard';
import { Layers } from 'lucide-react';
import featureImage from '@assets/generated_images/Text_leveling_graphic_731cc53d.png';

export default function FeatureCardExample() {
  return (
    <div className="w-80">
      <FeatureCard
        icon={Layers}
        title="Tahap Bacaan Berbeza"
        description="Setiap artikel disesuaikan kepada 5 tahap bacaan untuk memastikan pemahaman optimum"
        image={featureImage}
      />
    </div>
  );
}