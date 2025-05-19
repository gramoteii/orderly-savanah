
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CommentsSectionProps {
  comments: string;
  onCommentsChange: (value: string) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, onCommentsChange }) => {
  return (
    <div className="border-t pt-4">
      <Label htmlFor="comments">Комментарии</Label>
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
