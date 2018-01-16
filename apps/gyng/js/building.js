function Location() {
    this.items = [
        {
            "Area": "医学部",
            "Lists": [
                {
                    "Building": "1舍",
                    "Lists": [
                        {
                            "Unit": "1单元",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6"
                            ]
                        },
                        {
                            "Unit": "2单元",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6"
                            ]
                        }
                    ]
                },
                {
                    "Building": "6舍",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "Area": "樱园",
            "Lists": [
                {
                    "Building": "1舍",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4"
                            ]
                        }
                    ]
                },
                {
                    "Building": "2舍",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4"
                            ]
                        }
                    ]
                },
                {
                    "Building": "3舍",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4"
                            ]
                        }
                    ]
                },
                {
                    "Building": "4舍",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "Area": "工学部",
            "Lists": [
                {
                    "Building": "6舍",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "2",
                                "3",
                                "4",
                                "5",
                                "6"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "Area": "信息学部",
            "Lists": [
                {
                    "Building": "10舍东",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6"
                            ]
                        }
                    ]
                },
                {
                    "Building": "10舍西",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6"
                            ]
                        }
                    ]
                },
                {
                    "Building": "2舍",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6"
                            ]
                        }
                    ]
                },
                {
                    "Building": "5舍",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6"
                            ]
                        }
                    ]
                },
                {
                    "Building": "6舍",
                    "Lists": [
                        {
                            "Unit": "",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "Area": "枫园",
            "Lists": [
                {
                    "Building": "1舍",
                    "Lists": [
                        {
                            "Unit": "1单元",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4"
                            ]
                        },
                        {
                            "Unit": "2单元",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6"
                            ]
                        },
                        {
                            "Unit": "3单元",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5"
                            ]
                        }
                    ]
                },
                {
                    "Building": "2舍",
                    "Lists": [
                        {
                            "Unit": "1单元",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5"
                            ]
                        },
                        {
                            "Unit": "2单元",
                            "Lists": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5"
                            ]
                        }
                    ]
                }
            ]
        }
    ];
}

Location.prototype.find = function (pos) {
    if (typeof(this.items[pos]) == "undefined")
        return false;
    return this.items[pos];
}

Location.prototype.fillOption = function (el_id, loc_id, selected_id) {
    var el = $('#' + el_id);
    var json = this.find(loc_id);
    if (json) {
        var index = 1;
        var selected_index = 0;
        $.each(json, function (k, v) {
            var option = '<option value="' + k + '">' + v + '</option>';
            el.append(option);

            if (k == selected_id) {
                selected_index = index;
            }

            index++;
        })
        //el.attr('selectedIndex' , selected_index);
    }
    el.select2("val", "");
};

