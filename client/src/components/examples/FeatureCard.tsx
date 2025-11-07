import FeatureCard from '../FeatureCard';
import { Layers } from 'lucide-react';
import featureImage from '@assets/generated_images/Text_leveling_concept_illustration_6b3a0d97.png';

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