---
layout: post
title:  "Proper management of Rails settings"
date:   2019-11-27 21:38:56 +0200
categories: development
tags: rails
---
Hello my name is Chris and this is my first post on this blog. Today I would like to discuss a really import question, how do we store and organize Rails application settings.

```yaml
# config/settings/external_urls.yml

shared: &shared
  urls:
    dashboard:
      email_confirmation: "#{dashboard_origin}/email-confirmation?t=#{token}"
      password_confirmation: "#{dashboard_origin}/password-confirmation?t=#{token}"

development:
  <<: *shared
  origins:
    dashboard: "http://localhost:8080"

test:
  <<: *shared
  origins:
    dashboard: "http://localhost:8080"

production:
  <<: *shared
  origins:
    dashboard: <%= ENV['EXTERNAL_ORIGIN_DASHBOARD'] %>

```

```ruby
# config/initializers/_app_settings.rb

# frozen_string_literal: true

files = Dir.glob(Rails.root.join('config', 'settings', '*.yml').to_s)

APP_SETTINGS = (files.map do |file_path|
  name = file_path.split('/').last.split('.yml').first.to_sym
  template = File.read(file_path)
  content = ERB.new(template).result
  yml = YAML.safe_load(content, [], [], true, nil, symbolize_names: true)

  { name => yml[Rails.env.to_sym] }
end).inject({}) { |obj, settings| obj.merge(settings) }.freeze
```

