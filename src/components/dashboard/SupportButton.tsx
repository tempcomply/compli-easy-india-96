
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HelpCircle, MessageCircle, FileText, ExternalLink } from 'lucide-react';

const SupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Need Help?</DialogTitle>
            <DialogDescription>
              Get support for your compliance and tax requirements
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button className="w-full justify-start h-12" variant="outline">
              <MessageCircle className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Contact Support</div>
                <div className="text-xs text-muted-foreground">Get help from our team</div>
              </div>
            </Button>
            
            <Button className="w-full justify-start h-12" variant="outline">
              <FileText className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Help Articles</div>
                <div className="text-xs text-muted-foreground">Browse our knowledge base</div>
              </div>
            </Button>
            
            <Button className="w-full justify-start h-12" variant="outline">
              <ExternalLink className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Live Chat</div>
                <div className="text-xs text-muted-foreground">Chat with our experts</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupportButton;
