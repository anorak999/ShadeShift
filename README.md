# ShadeShift

A GNOME Shell extension for GNOME 47+ that allows you to assign separate wallpapers for Light and Dark modes with seamless transitions.

## Features

- Set different wallpapers for Light and Dark styles
- Automatic switching when toggling Dark Style via Quick Settings
- Simple preferences UI with file browser

## Installation

### From GNOME Extensions

Install from [extensions.gnome.org](https://extensions.gnome.org/).

### Manual Installation

```bash
git clone https://github.com/anorak999/ShadeShift.git
cd ShadeShift
glib-compile-schemas schemas/
ln -s "$(pwd)" ~/.local/share/gnome-shell/extensions/shadeshift@anorak
gnome-extensions enable shadeshift@anorak
```

Log out and back in, or restart GNOME Shell (Alt+F2, type `r`).

## Usage

1. Open GNOME Extensions app or run `gnome-extensions prefs shadeshift@anorak`
2. Set a wallpaper for Light Mode and Dark Mode
3. Toggle Dark Style in Quick Settings — your wallpaper switches automatically

## Requirements

- GNOME Shell 47 or later

## Author

Himath Rajapaksha — [GitHub](https://github.com/anorak999) — himath.hr@gmail.com

## License

GPL-3.0-or-later — see [LICENSE](LICENSE) for details.

## Issues

Report bugs at [GitHub Issues](https://github.com/anorak999/ShadeShift/issues).
