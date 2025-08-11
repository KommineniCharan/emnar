# Emnar Pharma Website Optimization

This repository contains comprehensive GitHub Actions workflows for optimizing the Emnar Pharma website performance, including HTML/CSS/JS minification, image optimization, responsive images, lazy loading, CSS purging, and Lighthouse CI audits.

## 🚀 Features

### Website Optimization (`optimize.yml`)
- **HTML/PHP Minification**: Removes whitespace, comments, and optimizes HTML structure
- **CSS Optimization**: 
  - Purges unused CSS using PurgeCSS
  - Minifies CSS with clean-css-cli
  - Removes redundant rules and optimizes selectors
- **JavaScript Minification**: Compresses and mangles JS files with Terser
- **Image Optimization**:
  - Converts images to WebP format for better compression
  - Generates responsive images (320w, 640w, 1024w, 1920w)
  - Optimizes existing images for web delivery
- **Performance Enhancements**:
  - Adds lazy loading to all images
  - Adds `decoding="async"` attribute for better performance
  - Adds preload links for critical resources
  - Optimizes font loading

### Lighthouse CI Audit (`lighthouse.yml`)
- **Performance Auditing**: Tests Core Web Vitals and performance metrics
- **Accessibility Testing**: Ensures WCAG compliance
- **Best Practices**: Checks for modern web development standards
- **SEO Analysis**: Validates search engine optimization
- **Automated Reporting**: Generates detailed performance reports
- **PR Comments**: Automatically comments on pull requests with results

## 📋 Prerequisites

- Node.js 18+ 
- PHP 7.4+ (for local testing)
- Git repository with GitHub Actions enabled

## 🛠️ Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure GitHub Secrets** (Optional):
   - `LHCI_GITHUB_APP_TOKEN`: For Lighthouse CI GitHub integration

3. **Update URLs** in `lighthouse.yml`:
   - Modify the URLs array to match your actual pages

## 🔧 Usage

### Manual Optimization
```bash
# Run full optimization
npm run optimize

# Optimize specific assets
npm run optimize:images
npm run optimize:css
npm run optimize:js
npm run add:lazyload

# Test performance
npm run test:performance
```

### GitHub Actions

The workflows run automatically on:
- **Push to main branch**: Triggers optimization and Lighthouse audit
- **Pull requests**: Runs Lighthouse audit and comments results
- **Manual trigger**: Use "workflow_dispatch" in GitHub Actions tab

## 📊 Performance Targets

### Lighthouse Scores
- **Performance**: ≥80% (Warning if below)
- **Accessibility**: ≥90% (Error if below)
- **Best Practices**: ≥80% (Warning if below)
- **SEO**: ≥80% (Warning if below)

### Core Web Vitals
- **First Contentful Paint**: <2s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Total Blocking Time**: <300ms
- **Speed Index**: <3s

## 📁 Output Structure

After optimization, files are committed to the `optimized` branch:

```
optimized/
├── *.php (minified)
├── css/ (purged and minified)
├── js/ (minified)
├── images/
│   ├── *.webp (optimized)
│   ├── 320w/ (responsive)
│   ├── 640w/ (responsive)
│   ├── 1024w/ (responsive)
│   └── 1920w/ (responsive)
└── fonts/ (unchanged)
```

## 🔍 Artifacts

The workflows generate several artifacts:
- **optimization-report.md**: Summary of optimization results
- **lighthouse-report.md**: Detailed performance analysis
- **lighthouse-results/**: Raw Lighthouse CI data

## ⚙️ Configuration

### Customize Optimization Settings

Edit the workflow files to adjust:
- Image quality settings
- Responsive image sizes
- CSS purge content patterns
- Lighthouse thresholds

### Exclude Files

Add patterns to exclude specific files from optimization:
```yaml
# In optimize.yml
- name: Exclude files
  run: |
    rm -rf optimized/admin/
    rm -rf optimized/temp/
```

## 🐛 Troubleshooting

### Common Issues

1. **PHP Server Not Starting**:
   - Ensure PHP is installed in the GitHub Actions environment
   - Check port availability (default: 8000)

2. **Image Optimization Fails**:
   - Verify image formats are supported (JPG, PNG, WebP)
   - Check file permissions

3. **CSS Purge Too Aggressive**:
   - Review PurgeCSS content patterns
   - Add safelist for dynamic classes

4. **Lighthouse Timeout**:
   - Increase timeout settings in workflow
   - Reduce number of pages tested

### Debug Mode

Enable debug logging:
```yaml
env:
  DEBUG: "*"
```

## 📈 Monitoring

### Performance Tracking
- Lighthouse CI stores historical data
- Compare performance over time
- Set up alerts for performance regressions

### Optimization Impact
- Monitor file size reductions
- Track Core Web Vitals improvements
- Measure page load time improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run test:performance`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review GitHub Actions logs
3. Create an issue with detailed information

---

**Note**: This optimization setup is specifically configured for the Emnar Pharma website structure. Adjust paths and patterns for other projects.
