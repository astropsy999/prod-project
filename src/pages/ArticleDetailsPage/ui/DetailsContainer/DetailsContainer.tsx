import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
  const { className } = props;
  // Get the "id" parameter from the URL using the useParams hook
  const { id } = useParams<{ id: string }>();

  return (
    <Card border='round' className={className} padding={'24'}>
      <ArticleDetails id={id} />;
    </Card>
  );
});
