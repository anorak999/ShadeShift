import Gio from 'gi://Gio';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const DESKTOP_INTERFACE = 'org.gnome.desktop.interface';
const DESKTOP_BACKGROUND = 'org.gnome.desktop.background';

export default class ShadeShiftExtension extends Extension {
    enable() {
        this._settings = this.getSettings();
        this._interfaceSettings = new Gio.Settings({schema_id: DESKTOP_INTERFACE});
        this._backgroundSettings = new Gio.Settings({schema_id: DESKTOP_BACKGROUND});

        this._interfaceSettings.connectObject(
            'changed::color-scheme', this._applyWallpaper.bind(this),
            this
        );

        this._applyWallpaper();
    }

    disable() {
        this._interfaceSettings.disconnectObject(this);
        this._settings = null;
        this._interfaceSettings = null;
        this._backgroundSettings = null;
    }

    _applyWallpaper() {
        const isDark = this._interfaceSettings.get_string('color-scheme') === 'prefer-dark';
        const wallpaperPath = isDark
            ? this._settings.get_string('dark-wallpaper')
            : this._settings.get_string('light-wallpaper');

        if (!wallpaperPath) return;

        const uri = wallpaperPath.startsWith('file://') ? wallpaperPath : `file://${wallpaperPath}`;

        if (isDark) {
            this._backgroundSettings.set_string('picture-uri-dark', uri);
            this._backgroundSettings.set_string('picture-uri', uri);
        } else {
            this._backgroundSettings.set_string('picture-uri', uri);
            this._backgroundSettings.set_string('picture-uri-dark', uri);
        }
    }
}
