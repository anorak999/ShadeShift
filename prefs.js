import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class ShadeShiftPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage({
            title: _('Wallpapers'),
            icon_name: 'preferences-desktop-wallpaper-symbolic',
        });
        window.add(page);

        const lightGroup = new Adw.PreferencesGroup({
            title: _('Light Mode'),
            description: _('Wallpaper used when the system is in light mode'),
        });
        page.add(lightGroup);

        const lightRow = new Adw.ActionRow({
            title: _('Light Wallpaper'),
            subtitle: _('File path for light mode wallpaper'),
        });
        lightGroup.add(lightRow);

        this._lightEntry = new Gtk.Entry({
            hexpand: true,
            placeholder_text: _('Enter path or browse'),
            text: settings.get_string('light-wallpaper'),
        });
        this._lightEntry.connect('changed', (entry) => {
            settings.set_string('light-wallpaper', entry.get_text());
        });
        lightRow.add_suffix(this._lightEntry);
        lightRow.set_activatable_widget(this._lightEntry);

        const lightBtn = new Gtk.Button({
            icon_name: 'document-open-symbolic',
            tooltip_text: _('Browse'),
            valign: Gtk.Align.CENTER,
        });
        lightBtn.connect('clicked', () => this._browse('light', settings));
        lightRow.add_suffix(lightBtn);

        const darkGroup = new Adw.PreferencesGroup({
            title: _('Dark Mode'),
            description: _('Wallpaper used when the system is in dark mode'),
        });
        page.add(darkGroup);

        const darkRow = new Adw.ActionRow({
            title: _('Dark Wallpaper'),
            subtitle: _('File path for dark mode wallpaper'),
        });
        darkGroup.add(darkRow);

        this._darkEntry = new Gtk.Entry({
            hexpand: true,
            placeholder_text: _('Enter path or browse'),
            text: settings.get_string('dark-wallpaper'),
        });
        this._darkEntry.connect('changed', (entry) => {
            settings.set_string('dark-wallpaper', entry.get_text());
        });
        darkRow.add_suffix(this._darkEntry);
        darkRow.set_activatable_widget(this._darkEntry);

        const darkBtn = new Gtk.Button({
            icon_name: 'document-open-symbolic',
            tooltip_text: _('Browse'),
            valign: Gtk.Align.CENTER,
        });
        darkBtn.connect('clicked', () => this._browse('dark', settings));
        darkRow.add_suffix(darkBtn);
    }

    _browse(mode, settings) {
        const dialog = new Gtk.FileChooserDialog({
            title: mode === 'light' ? _('Select Light Wallpaper') : _('Select Dark Wallpaper'),
            action: Gtk.FileChooserAction.OPEN,
            modal: true,
        });
        dialog.add_button(_('_Cancel'), Gtk.ResponseType.CANCEL);
        dialog.add_button(_('_Open'), Gtk.ResponseType.OK);

        const filter = new Gtk.FileFilter();
        filter.set_name(_('Images'));
        filter.add_mime_type('image/*');
        dialog.add_filter(filter);

        const allFilter = new Gtk.FileFilter();
        allFilter.set_name(_('All Files'));
        allFilter.add_pattern('*');
        dialog.add_filter(allFilter);

        dialog.connect('response', (_dialog, response) => {
            if (response === Gtk.ResponseType.OK) {
                const file = dialog.get_file();
                const path = file?.get_path();
                if (path) {
                    const uri = `file://${path}`;
                    if (mode === 'light') {
                        this._lightEntry.set_text(uri);
                    } else {
                        this._darkEntry.set_text(uri);
                    }
                    settings.set_string(`${mode}-wallpaper`, uri);
                }
            }
            dialog.destroy();
        });

        dialog.show();
    }
}
