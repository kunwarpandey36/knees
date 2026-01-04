import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const threads = [
  {
    topic: 'Best oils for knee massage?',
    author: 'Sunita J.',
    tag: 'Remedies',
    replies: 5,
    lastPost: '2 hours ago',
  },
  {
    topic: 'Struggling with morning stiffness. Any tips?',
    author: 'Priya M.',
    tag: 'Lifestyle',
    replies: 12,
    lastPost: '8 hours ago',
  },
  {
    topic: 'My experience with wall squats',
    author: 'Aarti V.',
    tag: 'Exercises',
    replies: 8,
    lastPost: '1 day ago',
  },
  {
    topic: 'Good vegetarian sources for calcium?',
    author: 'Kavita R.',
    tag: 'Diet',
    replies: 15,
    lastPost: '2 days ago',
  },
];

export default function CommunityForumPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Users className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
          Community Forum
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Share experiences, ask questions, and support each other. You are not alone.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline">Active Discussions</CardTitle>
                <CardDescription>Join the conversation or start your own.</CardDescription>
            </div>
            <Button>Start a New Discussion</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Topic</TableHead>
                <TableHead>Replies</TableHead>
                <TableHead className="text-right">Last Post</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {threads.map((thread) => (
                <TableRow key={thread.topic} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium font-headline">{thread.topic}</div>
                    <div className="text-sm text-muted-foreground">by {thread.author}</div>
                    <Badge variant="outline" className="mt-1">{thread.tag}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{thread.replies}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{thread.lastPost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
