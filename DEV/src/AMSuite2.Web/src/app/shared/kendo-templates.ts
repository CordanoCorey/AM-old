export class Templates {

    /**
     * From: account-edit#templateUsers
     */
    static ACCOUNT_EDIT_USERS = `
        <div style="overflow: hidden; border-bottom: 1px dashed rgb(197,203,205); margin: 4px 0 4px 0;">
            <div style="font-size: 1em; font-weight: bold; float: left; line-height: 16px;">
                #:data.LastName#, #:data.FirstName# 
            </div>
            <div style="float: right; font-size: 0.7em; line-height: 10px; padding-top: 2px;">
                (ID: #:data.UserId#)
            </div>
            <div style="font-size: 0.8em; float: left; clear: both;line-height: 15px;">
                #:data.EmailAddress#
            </div>
        </div>
    `;

    /**
     * From: announcements#files
     */
    static ANNOUNCEMENT_FILE_PREVIEW = `
        <span class="k-progress" style="width: 100%;"></span>
        <span class="k-icon k-i-doc"></span>
        <span class="k-filename" data-id="#=files[0].id#" title="#=files[0].name#" 
            data-extension="#=files[0].extension#" data-name="#=files[0].name#">
            #=fileNameFilter(files[0].name)#</span>
        <strong class="k-upload-status">
            <button type="button" class="k-button k-button-bare k-upload-action">
                <span class="k-icon k-i-close k-delete" title="Remove"></span>
            </button>
            <button type="button">
                <span class="k-icon k-i-arrow-n" title="Move Up"></span>
            </button>
            <button type="button">
                <span class="k-icon k-i-arrow-s" title="Move Down"></span>
            </button>
        </strong>
    `;

    /**
     * From: announcements#gridAnnouncements
     */
    static ANNOUNCEMENT_TYPE = `
        #= GetTypeColText(AnnouncementTypeId) #
    `;

    /**
     * From: meeting-view#bintreeview
     */
    static BIN_PREVIEW_TREE_ITEM = `
        <div class="binpreviewtreeitem">
            # if (typeof item.items === "undefined") { #
            <span class="agendaitem-child">
            <a id="#: item.Id #">#: item.Name #</a></span> # } else { #
            <span class="agendaitem-parent">
            <a id="#: item.Id #">#: item.Name #</a></span> # } #
            <div class="iteminfo" data-order="#: item.Order #" data-id="#: item.Id #" style="display: none"></div>
            # if (item.HasNotes) { #
            <span class="ui-icon ui-icon-notes" style="float: right;" title="Notes"></span>
            # } # # if (item.HasAttachments) { #
            <span class="ui-icon ui-icon-paperclip" style="float: right;" title="Attachments"></span>
            # } #
        </div>
    `;

    /**
     * From: meeting-view#files
     */
    static AGENDA_ITEM_FILE_PREVIEW = `
        <span class="k-progress" style="width: 100%;"></span>
        <span class="k-icon k-i-doc"></span>
        <span class="k-filename" title="#=name#">#=fileNameFilter(name)#</span>
        <strong class="k-upload-status">
            Withhold Attachment from the public
            <input title="Withhold Attachment from the public" type="checkbox" name="chkPrivateAttachment"/>
            <button type="button" class="k-button k-button-bare k-upload-action">
                <span class="k-icon k-i-close k-delete" title="Remove"></span>
            </button>
            <button type="button">
                <span class="k-icon k-i-arrow-n" title="Move Up"></span>
            </button>
            <button type="button" data-bind="click: MoveAttachmentDown">
                <span class="k-icon k-i-arrow-s" title="Move Down"></span>
            </button>
        </strong>
    `;

    static MEETINGS_LIST_AGENDA_COLUMN = `
        # $.each(agenda, function(data) { if (typeof this.Name !== "undefined") {#
            <div style="display:list-item; margin-left: 15px; margin-bottom: 4px;">
                <span style="position: relative; left: -4px;">
                    <a href="/#: this.URLBase #/meeting/view/#: this.MeetingId #/#: this.Id #">#: this.Name #</a>
                </span>
            </div>
        # } }); #
    `;

    /**
     * From: meeting-view#recipients-list
     */
    static RECIPIENTS_LIST_TAB = `
        <span title="#: FullName #">
            #: EmailAddress #
        </span>
    `;

    /**
     * From: restore#grid#restore-template
     */
    static RESTORE_GRID_ROW = `
        # if (MeetingMarkedForDelete && AgendaMarkedForDelete) {#
            <a class="button thinicon RestoreItem" data-mid="#: MeetingId #" data-aid="#: AgendaId #">
        # } else if (MeetingMarkedForDelete) { #
            <a class="button thinicon RestoreItem" data-mid="#: MeetingId #" data-aid="0">
        # } else { #
            <a class="button thinicon RestoreItem" data-mid="0" data-aid="#: AgendaId #">
        # } #
            <span class="icon-container">
                <span class="icon ui-icon-members"></span>
                <span class="icon-text" style="font-weight: normal;">Restore</span>
            </span>
        </a>
    `;

    /**
     * From: public#searchResults#searchResult
     */
    static SEARCH_RESULT = `
            <p>
                #=Icon#
                <a href="#=Path#">#=Title#</a>

                <div>#=HitHighlightedSummary#</div>
                
                #if (MeetingLink != null && AgendaLink != null && AgendaItemLink != null && IsDocument ){#
                    <span style="font-size: 0.8em;">
                        Search terms were found in an attachment in agenda item 
                        <a href="#=AgendaItemLink.URL#">#=AgendaItemLink.Name#</a>
                        in agenda <a href="#=AgendaLink.URL#">#=AgendaLink.Name#</a>
                        in meeting <a href="#=MeetingLink.URL#">#=MeetingLink.Name#</a>
                    </span>
                #}else if (MeetingLink != null && AgendaLink != null){#
                    <span style="font-size: 0.8em;">
                        Search terms were found in an agenda item in agenda 
                        <a href="#=AgendaLink.URL#">#=AgendaLink.Name#</a>
                        in meeting <a href="#=MeetingLink.URL#">#=MeetingLink.Name#</a>
                    </span>
                #}else if (MeetingLink != null){#
                    <span style="font-size: 0.8em;">
                        Search terms were found in an agenda in meeting 
                        <a href="#=MeetingLink.URL#">#=MeetingLink.Name#</a>
                    </span>
                #}#
                <hr />
            </p>
    `;

    /**
     * From: public#searchResults
     */
    static SEARCH_RESULT_PUBLIC = `
        <p>
            #=Icon#
            <a href="#=Path#">#=Title#</a>

            <div>#=HitHighlightedSummary#</div>

            #if (MeetingLink != null && AgendaLink != null && AgendaItemLink != null && IsDocument ){#
                <span style="font-size: 0.8em;">Search terms were found in an attachment in agenda item 
                <a href="#=AgendaItemLink.URL#">#=AgendaItemLink.Name#</a> in agenda
                <a href="#=AgendaLink.URL#">#=AgendaLink.Name#</a> in meeting 
                <a href="#=MeetingLink.URL#">#=MeetingLink.Name#</a>
                </span>
            #}else if (MeetingLink != null && AgendaLink != null){#
                <span style="font-size: 0.8em;">Search terms were found in an agenda item in agenda 
                <a href="#=AgendaLink.URL#">#=AgendaLink.Name#</a> in meeting 
                <a href="#=MeetingLink.URL#">#=MeetingLink.Name#</a>
                </span>
            #}else if (MeetingLink != null){#
                <span style="font-size: 0.8em;">Search terms were found in an agenda in meeting 
                <a href="#=MeetingLink.URL#">#=MeetingLink.Name#</a>
                </span>
            #}#

            <hr />
        </p>
    `;

    /**
     * From: template-preview#selected-template-tree
     */
    static TEMPLATE_ITEM = `
        # if (typeof item.items === "undefined") { #
            <span class="agendaitem-child">
                <span class="item-order" style="font-size: .9em;">#: item.Order #</span>
                .&nbsp;<a id="#: item.Id #">#: item.Name #</a>
            </span>
        # } else { #
            <span class="agendaitem-parent">
                <span class="item-order">#: item.Order #</span>
                .&nbsp;<a id="#: item.Id #">#: item.Name #</a>
            </span>
        # } #
            <div class="iteminfo" data-order="#: item.Order #" data-id="#: item.Id #" style="display: none"></div>
        # if (item.IsPrivate) { #
            <span class="ui-icon ui-icon-private" style="float: right;" title="Private Item!"></span>
        # } #
    `;

    /**
     * From: accounts#accountsgrid
     */
    static ACCOUNT_GRID_ITEM = (urlBase: string, accountId: number) => {
        return `
            <a class="button thinicon" href="/${urlBase}/members">
                <span class="icon-container"><span class="icon ui-icon-members"></span>
                <span class="icon-text" style="font-weight: normal;">View Members</span></span>
            </a>
            <a class="button thinicon" style="margin-left: 2px;" href="/${urlBase}/import/members">
                <span class="icon-container"><span class="icon ui-icon-script"></span>
                <span class="icon-text" style="font-weight: normal;">Import Members</span></span>
            </a>
            <a class="EditAccount button thinicon" href="/admin/account/edit/${accountId}">
                <span class="icon-container"><span class="icon ui-icon-pencil"></span>
                <span class="icon-text" style="font-weight: normal;">Edit</span></span>
            </a>
        `;
    }

    /**
     * From: announcements#gridAnnouncements
     */
    static ANNOUNCEMENT = (announcement: any) => {
        return `
        <a id='alink${announcement.id}' class='list-link' 
            data-id='${announcement.id}' 
            data-value='${announcement}' 
            data-signature='${announcement.signature}' 
            data-startdate='${announcement.startDate}' 
            data-enddate='${announcement.endDate}' 
            data-createdby='${announcement.createdBy}' 
            data-createddate='${announcement.createdDate}' 
            data-lastmodifiedby='${announcement.lastModifiedBy}' 
            data-lastmodifieddate='${announcement.lastModifiedDate}' 
            data-typeid='${announcement.typeId}' 
            data-groupid='${announcement.groupId}'>
            ${announcement.subject}</a>
    `;
    }

    /**
     * From: groups#gridAdministrator
     */
    static GROUP_ADMINISTRATOR = (group: any) => {
        return `
            <a id='alink${group.id}' class='list-link' 
            data-level='1' 
            data-id='${group.id}' 
            data-value='${group.description.replace(/'/g, '')}' 
            data-createdby='${group.createdBy}' 
            data-groupadminid='${group.groupAdministratorId}' 
            data-outlineid='${group.outlineId}' 
            data-createddate='${group.createdDate}' 
            data-modifiedby='${group.lastModifiedBy}' 
            data-modifieddate='${group.lastModifiedDate}' 
            data-allowsuggestions='${group.allowSuggestions}'>
            ${group.groupName}</a>
        `;
    }

    /**
     * From: groups#gridManager
     */
    static GROUP_MANAGER = (group: any) => {
        return `
            <a id='alink${group.id}' class='list-link' 
            data-level='0' data-id='${group.id}' 
            data-value='${group.description.replace(/'/g, '')}' 
            data-createdby='${group.createdBy}' 
            data-createddate='${group.createdDate}' 
            data-groupadminid='${group.groupAdministratorId}' 
            data-outlineid='${group.outlineId}' 
            data-modifiedby='${group.lastModifiedBy}' 
            data-modifieddate='${group.lastModifiedDate}' 
            data-allowsuggestions='${group.allowSuggestions}'>
            ${group.groupName}</a>
        `;
    }

    /**
     * From: groups#gridAdministrator
     */
    static GROUP_MEMBER_COUNT = (group: any) => {
        return `
            <div style="width: 100%; text-align: center;">${group.memberCount}</div>
        `;
    }
}
