import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoCredentials = () => {
  const [isVisible, setIsVisible] = useState(false);

  const credentials = {
    email: 'sarah.johnson@techoos.com',
    password: 'Pipeline2024!'
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      alert(`${type} copied to clipboard!`);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="TestTube" size={16} color="var(--color-warning)" />
            <h3 className="text-sm font-semibold text-foreground">Demo Access</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            iconName={isVisible ? 'EyeOff' : 'Eye'}
            iconSize={14}
          >
            {isVisible ? 'Hide' : 'Show'}
          </Button>
        </div>

        {isVisible && (
          <div className="space-y-3">
            <div className="bg-background rounded-md p-3 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Email</p>
                  <p className="text-sm font-mono text-foreground">{credentials?.email}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(credentials?.email, 'Email')}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="Copy" size={14} />
                </button>
              </div>
            </div>

            <div className="bg-background rounded-md p-3 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Password</p>
                  <p className="text-sm font-mono text-foreground">{credentials?.password}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(credentials?.password, 'Password')}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="Copy" size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2 mt-3">
              <Icon name="Info" size={14} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Use these credentials to explore the full sales pipeline platform with sample data.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoCredentials;