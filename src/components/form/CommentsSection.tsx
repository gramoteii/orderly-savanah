
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface CommentsSectionProps {
  comments: string;
  onCommentsChange: (value: string) => void;
}

const commentTemplates = [
  'Срок выполнения - 2 недели',
  'Требуется предоплата 50%',
  'Срочный заказ, повышенный приоритет',
  'Отправить дизайн на согласование',
  'Необходима встреча с клиентом'
];

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, onCommentsChange }) => {
  const appendTemplate = (template: string) => {
    const newComments = comments ? `${comments}\n${template}` : template;
    onCommentsChange(newComments);
  };

  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center mb-2">
        <Label htmlFor="comments">Комментарии</Label>
        <div className="text-sm text-muted-foreground">
          Шаблоны:
        </div>
      </div>
      
      <div className="mb-2 flex flex-wrap gap-2">
        {commentTemplates.map((template, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm" 
            onClick={() => appendTemplate(template)}
            className="text-xs"
          >
            {template}
          </Button>
        ))}
      </div>
      
      <Textarea
        id="comments"
        value={comments}
        onChange={(e) => onCommentsChange(e.target.value)}
        rows={3}
        placeholder="Сроки, особые требования, дополнительная информация..."
      />
    </div>
  );
};

export default CommentsSection;
